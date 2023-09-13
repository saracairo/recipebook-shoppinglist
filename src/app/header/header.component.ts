import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() featureSelected = new EventEmitter<string>(); // EventEmitter - le parentesi indicano il costruttore che creerà istanza oggetto basato sulla classe EventEmitter;
  // il decoratore @Output() rende la featureSelected visibile, utilizzabile e, in quanto evento, ascoltabile dal parent
  collapsed = true;

  // metodo usato da più link, quindi richiede un argomento che indica cosa selezionare
  onSelect(feature: string) {
    this.featureSelected.emit(feature); // emetterà l'evento passato tramite stringa feature: nel template 'recipe' o 'shopping-list'
  }
}
