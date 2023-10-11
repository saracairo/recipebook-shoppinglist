import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  id!: number;
  editMode = false; // variabile che conserva l'informazione "sto modificando la ricetta"
  recipeForm!: FormGroup;

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // controllare se mi trovo in editMode ogni volta che i parametri cambiano:
          this.editMode = params['id'] != null; // se params ha la proprietà id che non corrisponde a 'null', siamo in edit mode, altrimenti ci troviamo in new mode
          console.log(this.editMode); // test editMode

          // qui si chiama initForm() per costruire il form in base alle condizioni configurate:
          this.initForm();
        }
      );
  }

  // metodo responsabile dell'inizializzazione del form
  private initForm() {
    let recipeName = ''; // registrare variabile per poterne gestire il valore in un metodo e passare il risultato all'interno della configurazione di FormControl()
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray(<any>[]); // di default risultava in tipo 'never' e in errore alla creazione di nuovo FormGroup nel for-loop successivo

    // metodo if che ne stabilisce i valori in base all'editMode:
    // se attiva, impostarli tramite id corrente dell'elemento;
    // se disattivata, lasciare vuoti i FormControl
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id); // accesso alla recipe tramite l'id corrente
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route}); // va su di un livello rispetto a questa route
  }

  onAddIng() {
    // specificare il tipo all'inizio per comunicarlo ad Angular e poter chiamare '.push()'
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIng(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    const newRecipe = new Recipe( // configurazione di cosa l'oggetto newRecipe si aspetta:
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    console.log(this.recipeForm);

    // alternativa (vantaggio dell'approccio ReactiveForm): se, come in questo caso, il valore del form ha la stessa forma e gli stessi nomi del modello (Recipe), si può evitare di conservarlo in una nuova const e passarlo come "this.recipeForm.value":
    // if (this.editMode) {
    //   this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    // } else {
    //   this.recipeService.addRecipe(this.recipeForm.value);
    // }
    console.log(this.recipeForm);
    this.onCancel(); // per navigare via
  }

}
