import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "../../modal/modal.component";
import { ICategoria, IProducto } from "../../../interfaces";
import { ProductosService } from "../../../services/productos.service";
import { CategoriasService } from "../../../services/categoria.service";
import { ProductosFormComponent } from "../productos-form/productos-form.component";
@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductosFormComponent
  ],
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.scss'
})
export class ProductosListComponent implements OnChanges {

  @Input() itemList: IProducto[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: IProducto = {};
  public selectedCategoria: ICategoria ={};
  public productosService: ProductosService = inject(ProductosService);
  public categoriasService: CategoriasService = inject(CategoriasService);


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(item: IProducto, modal: any) {
    this.selectedCategoria = {...item.categoriaProducto};
    this.selectedItem = { ...item };
    modal.show();
  }

  handleFormAction(item: IProducto) {
    this.productosService.update(item);
  }

  deleteGame(item: IProducto) {
    this.productosService.delete(item);
  }
}