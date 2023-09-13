import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipebook-shoppinglist';

  loadedFeature = 'recipe'; // inizialmente il valore sarà recipe e quindi impostato sulla feature Recipe

  onNavigate(feature: string) {
    this.loadedFeature = feature; // riceverà la feature ricevuta come argomento
  }
}
