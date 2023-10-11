import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // funzionalità del servizio:
  // 1. gestire gli ingredienti
  // 2. aggiunta ingredienti

  ingredientsChanged = new Subject<Ingredient[]>;
  startedEditing = new Subject<number>; // Subject farà da EventEmitter con i dati che il metodo che l'usa riceverà

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) { // metodo che riceve un ingrediente di tipo Ingredient... 
    this.ingredients.push(ingredient); // ..e lo aggiunge all'array 'ingredients'
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // un for loop costerebbe troppe emissioni, quindi evitare;
    // aggiungere prima tutti gli ingredienti, poi emettere evento / subject
    this.ingredients.push(...ingredients); // lo spread operator (...) trasforma un array di elementi in una lista, così che vengano aggiunti all'array evitando di entrarci COME array
    this.ingredientsChanged.next(this.ingredients.slice()); // informa l'app che gli ingredienti sono cambiati
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1); // il primo argomento indica l'inizio dell'operazione, quindi l'index corrente, e il secondo argomento indica quanti elementi cancellare
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
