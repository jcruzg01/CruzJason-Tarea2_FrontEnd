import { Component, Input, Output, EventEmitter, OnInit, inject} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriasService } from "../../../services/categoria.service";
import { ModalComponent } from "../../modal/modal.component";
import { ICategoria, IProducto } from "../../../interfaces";
import { ProductosService } from "../../../services/productos.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector:'app-productos-form',
    standalone: true,
    imports:[
        CommonModule, 
        FormsModule
    ],
    templateUrl:'./productos-form.component.html',
    styleUrl:'./productos-form.component.scss'
})
export class ProductosFormComponent {
    @Input() producto: IProducto = {};
    @Input() categoria: ICategoria = {};
    @Input() categorias: ICategoria[] = [];
    @Input() action = '';
    @Output() callParentEvent: EventEmitter<IProducto> = new EventEmitter<IProducto>();

    callEvent(){
        this.producto.categoriaProducto = this.categoria;
        this.callParentEvent.emit(this.producto);
    }
}