import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    @Input() message: string; // impostabile dall'esterno
    @Output() close = new EventEmitter<void>(); // per poter impostare il valore di error dall'esterno

    onClose() {
        this.close.emit();
    }
}