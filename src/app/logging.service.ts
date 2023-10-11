// servizio di log che stampa il momento in cui ogni componente viene caricato e il funzionamento dei servizi

import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoggingService {
    lastlog: string;

    // metodo che verrà chiamato all'OnInit dei componenti:
    printLog(message: string) {
        console.log(message);
        console.log(this.lastlog); // mostra lastlog (undefined in console)
        this.lastlog = message; // sovrascrive lastlog con message
    }

    // in console, mostrerà prima il log in AppComponent (1. proprietà lastlog undefined, 2. la stessa proprietà sovrascritta dal messaggio) e, dopo la navigazione su ShoppingListComponent, stamperà nuovamente 1. il messaggio di App e 2. la sovrascrittura di ShoppingList:
    // l'assenza di un secondo log 'undefined' prova che viene usata una sola istanza del servizio nell'intera app;
    // fornire il servizio in AppModule (provide) invece che usare il decoratore configurato '@Injectable({ providedIn: 'root' })', avrebbe lo stesso effetto;
    // usando un'istanza separata importata in un modulo caricato in LL, il risultato in console sarebbe 1. nuovamente 'undifined' e 2. messaggio in ShoppingList
}