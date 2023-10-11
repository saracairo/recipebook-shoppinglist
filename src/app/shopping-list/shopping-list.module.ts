import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        ShoppingListRoutingModule,
        // è ok anche importare le route tramite metodo forChild() di RouterModule qui in questo modo:
        // RouterModule.forChild([
        //     { path: 'shopping-list', component: ShoppingListComponent }
        // ])
        SharedModule
    ]
})
export class ShoppingListModule { }