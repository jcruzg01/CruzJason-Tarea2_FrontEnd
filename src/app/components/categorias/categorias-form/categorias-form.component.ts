import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ICategoria } from "../../../interfaces";

@Component({
    selector:'app-categorias-form',
    standalone: true,
    imports:[
        CommonModule,
        FormsModule
    ],
    templateUrl: './categorias-form.component.html',
    styleUrl:'./categorias-form.component.scss',
})
export class CategoriasFormComponent {
    @Input() categoria: ICategoria =  {};
    @Input() action = '';
    @Output() callParentEvent: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();

    callEvent(){
        this.callParentEvent.emit(this.categoria);
    }
}