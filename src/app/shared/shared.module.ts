// il nome del modulo condiviso non deve avere per forza chiamarsi Shared, è ok che abbia a che fare con la/le features che contiene
// importare qui componenti, direttive a altri moduli che saranno usati da più aree dell'app (e quindi importati tutti tramite questo modulo)
// è necessario alla fine esportarli così da non doverli importare uno ad uno nelle altre aree

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

import { PlaceholderDirective } from "./placeholder.directive";
import { DropdownDirective } from "./drowpdown.directive";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule { }