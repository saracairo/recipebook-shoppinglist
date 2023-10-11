import { Component } from "@angular/core";

@Component({
    selector: 'app-loading-spinner',
    template: '<div class="lds-hourglass"></div>',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent { }

// https://loading.io/css

/* ------------- template -------------

<div *ngIf="isLoading" style="text-align: center">
    <app-loading-spinner></app-loading-spinner>
</div>

----------------------------------- */

/* ------------- property key -------------

isLoading = false;

----------------------------------- */