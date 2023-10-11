import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
    // VCR permette l'accesso alla pointer reference là dove viene usata per ottenere informazioni sull'elemento e coordinarlo;
    // possiede metodi utili quali creare un componente lì dov'è posizionata la direttiva
    constructor(public viewContainerRef: ViewContainerRef) { } // dichiararla public così che possa essere accessibile di template tramite ViewChild

    
}