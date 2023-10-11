import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // il servizio deve:
  // 1. gestire le ricette
  // 2. cross-component comunication

  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>;
/*
  // array accessibile direttamente solo da qui (sarà accessibile attraverso un metodo)
  private recipes: Recipe[] = [
    new Recipe(
      'TestRecipe',
      'this is a test',
      'https://static01.nyt.com/images/2023/08/16/multimedia/MRS-Roasted-Carrots-vzjq/MRS-Roasted-Carrots-vzjq-master768.jpg?w=1280&q=75',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Carrot', 20)
      ]
    ),
    new Recipe(
      'Another gest rec',
      'this is a test',
      'https://static01.nyt.com/images/2023/03/13/multimedia/NHJ-Strawberry-Shortcake-qtkw-copy/NHJ-Strawberry-Shortcake-qtkw-articleLarge.jpg?w=1280&q=75.nyt.com/images/2023/08/16/multimedia/MRS-Roasted-Carrots-vzjq/MRS-Roasted-Carrots-vzjq-master768.jpg?w=1280&q=75',
      [
        new Ingredient('Buns', 3),
        new Ingredient('Panna', 1)
      ]
    )
  ]; // ts ora sa che il tipo di valore che conterrà questa variabile sarà soltanto array di Recipe
*/
  recipeSelected = new Subject<Recipe>();

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  // metodo che rende accessibili al resto dell'app i dati dell'array 'recipes'
  getRecipes() {
    // tentando di accedere all'array in questo modo:
    // return this.recipes,
    // per es. cambiare qualcosa in un componente, i dati cambieranno anche nel'array del servizio (ora che è tutto hardcoded)
    return this.recipes.slice(); // in questo modo avremmo accesso a una copia dell'array
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList (ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  // metodo che sovrascrive l'attuale array di recipes
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice()); // push di una copia dell'array in recipes
  }

}
