import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipesComponent } from "./recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes-resolver.service";

const recipesRoutes: Routes = [
    {
        // importante che il primo path sia vuoto: su  '/recipes' si viene indirizzati dall'esterno (AppRoutingModule) e una volta qui siamo già in '/recipes':
        path: '',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
        // tutti i componenti child vengono dopo la route definita, per cui in questo caso inizieranno con 'recipes/childroute'
            {
                path: '',
                component: RecipeStartComponent
            },
            {
                path: 'new',
                component: RecipeEditComponent
            }, // importante che questa route venga prima dei parametri dinamici
            {
                path: ':id',
                component: RecipeDetailComponent,
                resolve: [RecipesResolverService],
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [RecipesResolverService],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)], // forRoot() per modulo di base, forChild() per moduli feature
    exports: [RouterModule]
})
export class RecipesRoutingModule { }