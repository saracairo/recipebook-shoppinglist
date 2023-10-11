import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    // la direttiva avrà una funzionalità che assegnerà e rimuoverà ad un elemento una classe al click

    // per attaccare o distaccare dinamicamente una classe su un elemento dipendentemente dal valore della proprietà, aggiungere HostBinding per poter fare property binding con la direttiva
    @HostBinding('class.open') isOpen = false; // class è array di tutte le classi proprie dell'elemento; selezionare open

    // importo HostListener e gli chiedo di ascoltare un evento click;
    // lo assegno al metodo toggleOpen()
    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen; // imposterà la proprietà isOpen secondo il valore opposto a quello attuale
    // }

    // alternativa con HostListener sul documento e non sul dropdown,
    // che permette di chiudere il menu cliccando anche altrove rispetto al tasto dropdown
    // (in questo modo, anche cliccare su un altro menu chiuderà il precedente)
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    constructor(private elRef: ElementRef) { }

}