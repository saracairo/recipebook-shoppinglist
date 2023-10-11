import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  }, // ridireziona soltanto se l'intero path è vuoto
  {
    path: 'recipes',
    // loadChildren indica ad Angular di caricare il codice a cui punta solo quando il path viene visitato, tramite una funzione arrow nel cui body si importa dinamicamente - come fosse una funzione - il modulo;
    // then() blocco promise che riceve il modulo in argomento m dal quale estrarre il modulo:
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) // poiché viene importato qui, evitare di listarlo in AppModule
    // (dopo l'implementazione con loadChildren è necessario riavviare il server)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [
    // opzionale:
    // è possibile aggiungere un secondo argomento a forRoot(): oggetto JS preloadStrategy per configurare la strategia del router di root:
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
      // indica ad Angular che l'app è comunque divisa in bundle, ma ne fa il pre-load il prima possibile per evitare ritardi se ci si trova vicino a route consequenziali
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
