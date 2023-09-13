import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {

  recipes: Recipe[] = [
    new Recipe('TestRecipe', 'this is a test', 'https://static01.nyt.com/images/2023/08/16/multimedia/MRS-Roasted-Carrots-vzjq/MRS-Roasted-Carrots-vzjq-master768.jpg?w=1280&q=75')
  ]; // ts ora sa che il tipo di valore che conterrà questa variabile sarà soltanto array di Recipe

}
