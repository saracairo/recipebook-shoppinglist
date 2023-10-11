// resolver che carica i dati prima che la le patine detail sia caricata

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipeService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return array o un obs che alla fine sarà un array
        
        const recipes = this.recipeService.getRecipes();

        if (recipes.length === 0) { // se non sono presenti ricette...
            return this.dataStorageService.fetchRecipes(); // ... esegui fetchRecipes()...
        } else { // ... altrimenti...
            return recipes; // ... risulta in recipes (ricette presenti nell'array)
        }
        
    }
}