import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {

  @Input() recipe!: Recipe; // non viene definita qui perché il valore (la ricetta) sarà ricevuta dall'esterno (cosa resa possibile dal decoratore @Input, che ne renderà possibile il binding fuori dal componente)

}
