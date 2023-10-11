import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  // gli eventi custom non si propagano più su del parent e non è possibile ascoltare eventi di un child del child, quindi:
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes!: Recipe[];
  subscription!: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /*
  As of **Angular 8+**, there's a new way of **clearing all items** in a `FormArray`.
  (<FormArray>this.recipeForm.get('ingredients')).clear();
  The `clear()` method automatically loops through all registered `FormControl`s (or `FormGroup`s) in the FormArray and removes them.
  It's like manually creating a loop and calling `removeAt()` for every item.
  */
}
