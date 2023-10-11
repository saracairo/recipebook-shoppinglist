import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  selectedRecipe!: Recipe; // inizialmente indefinito perché verrà assegnato un valore alla selezione nel template dall'evento passato da recipe-list che mostrerà i dettagli 

  constructor(
    // private recipeService: RecipeService
  ) { }

  ngOnInit() {
    // usando le route, questo modo di recuperarle non serve più:
    // this.recipeService.recipeSelected.subscribe( 
    //   (recipe: Recipe) => {
    //       this.selectedRecipe = recipe; // si riferisce alla recipe ottenuta tramite l'evento
    //     }
    // );
  }
  // subscribe((argomento) => {corpo della funzione})
  // subscribe() nel costruttore permette al componente di rimanere informato di ogni cambiamento
  // so che riceverò dei dati di tipo Recipe - (recipe: Recipe) (così è configurato l'EventEmitter di recipeSelected in RecipeService)

}
