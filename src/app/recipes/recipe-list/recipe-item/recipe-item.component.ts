import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {

  @Input() recipe!: Recipe; // non viene definita qui perché il valore (la ricetta) sarà ricevuta dall'esterno (cosa resa possibile dal decoratore @Input, che ne renderà possibile il binding fuori dal componente);
  // tramite ngFor + riferimento a questa proprietà, il componente parent looperà tutte le ricette presenti di tipo recipe

  // @Output() recipeSelected = new EventEmitter<void>(); // non conterrà informazioni, non si passerà da qui la ricetta perché le info sono già prese dal for-loop di ngFor
  
  @Input() index!: number;

  constructor(
    // private recipeService: RecipeService
  ) { }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }
}
  