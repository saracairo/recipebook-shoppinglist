import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput') nameInputRef!: ElementRef;
  // @ViewChild('amountInput') amountInputRef!: ElementRef;
  // // @Output() ingredientAdded = new EventEmitter<Ingredient>(); // il tipo di questa proprietà EventEmitter è un oggetto JS con due proprietà: name (stringa) e amount (numero); è sostituibile con il modello creato Ingredient

  editListForm!: FormGroup;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number; // variabile che conserva l'index dell'item che si sta modificando
  editedItem!: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit(): void {
    // creazione form:
    this.editListForm = new FormGroup({
      'ingName': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]) // "pattern: greater than 0"
    });

    // iscrizione all'inizializzazione componente al Subject, che riceverà il numero dell'ingrediente che vogliamo modificare
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        // ----- accesso alle informazioni (ingredienti) da modificare -----
        // ci troveremo in questa funzione anonima soltanto se startedEditing viene triggerato, quindi siamo in editMode
        this.editMode = true;
        this.editedItemIndex = index;
        // ----- modifica informazioni (ingredienti) -----
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editListForm.setValue({
          ingName: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit() {
    // variabile che conserva i valori del form:
    // (così da poterli estrarre nei metodi successivi)
    const value = this.editListForm.value;

    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value; // queste due const prenderanno il valore dal nativeElement inserito dall'utente nel template (nativeElement = wrapper attorno all'elemento DOM HTML)
    const newIngredient = new Ingredient(value.ingName, value.amount);
    // dichiarare variabili con const se non si pianifica di cambiarle in seguito; qui ogni variabile fa riferimento ad un ingrediente solo, quindi ok const

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.editListForm.reset();

    // emissione nuovo evento che passa attraverso le proprietà input che passa i dati al parent ShoppingListComponent, che gestisce l'array di ingredienti
    // this.ingredientAdded.emit(newIngredient);
  }

  onClear() {
    this.editListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // 1. informare il servizio che deve rimuovere uno degli item nell'array
    // 2. chiamare metodo onClear()
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
