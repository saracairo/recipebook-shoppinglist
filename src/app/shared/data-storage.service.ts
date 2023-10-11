// servizio di interazione con il backend

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    // non c'è bisogno di sottoscriversi a user qui ma solo controllare il token dell'attuale utente dei metodi storeRecipes() e fetchRecipes()

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) { }

    // salvare le ricette
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        // per questo metodo, che sarà chiamato dall'header (componente non interessato allo stato della richiesta), è più pratico sottoscriversi alla richiesta direttamente qui:
        this.http.put(
            'https://ng-recipebook-a3c8f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            recipes
        ).subscribe(response => {
            console.log(response);
        });
    }

    // recuperare dati ricette
    fetchRecipes() {
        // accesso on demand a user attuale solo al momento della chiamata del metodo:
        // take() prende 1 valore dall'Obs che poi deve fare automaticamente unsubscribe;
        // exhaustMap() aspetta che il primo Obs - user - si completi, e lo fornisce in seguito
        // return this.authService.user.pipe(
        //     take(1),
        //     exhaustMap(user => {
        //         return this.http.get<Recipe[]>(
        //             'https://ng-recipebook-a3c8f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        //             { // argomento oggetto in cui configurare token:
        //                 params: new HttpParams().set('auth', user.token)
        //             }
        //         );
        //     }),
        return this.http.get<Recipe[]>(
            'https://ng-recipebook-a3c8f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => { // qui map() è metodo array JS - quindi non operatore rxjs - che trasforma gli elementi di una array, in questo caso recipe di recipes
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : [],
                    }; // '...recipe' copia tutti i dati esistenti; ingredients sarà uguale a: se recipe.ingredients è vero, quindi non array vuoto, a recipe.ingredients, altrimenti sarà uguale a un array vuoto
                }); 
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
    // ritornare per chiarimento:
    // https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14466438#content

}