import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // alternativa senza routing:
  // @Output() featureSelected = new EventEmitter<string>(); // EventEmitter - le parentesi indicano il costruttore che creerà istanza oggetto basato sulla classe EventEmitter;
  // // il decoratore @Output() rende la featureSelected visibile, utilizzabile e, in quanto evento, ascoltabile dal parent
  collapsed = true;
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe(
        user => {
          // se abbiamo un utente, siamo loggati
          this.isAuthenticated = !user ? false : true; // shortcut per la ternary expression: !!user (not not user)
          console.log(!user);
          console.log(!!user);
        }
      )
  }

  // // metodo usato da più link, quindi richiede un argomento che indica cosa selezionare
  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature); // emetterà l'evento passato tramite stringa feature: nel template 'recipe' o 'shopping-list'
  // }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
