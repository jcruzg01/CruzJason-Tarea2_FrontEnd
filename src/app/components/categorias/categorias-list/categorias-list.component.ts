import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ICategoria } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../../../services/game.service';
import { CategoriasService } from '../../../services/categoria.service';
import { CategoriasFormComponent } from '../categorias-form/categorias-form.component';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    CategoriasFormComponent
  ],
  templateUrl: './categorias-list.component.html',
  styleUrl: './categorias-list.component.scss'
})
export class CategoriaListComponent implements OnChanges{
  @Input() itemList: ICategoria[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: ICategoria = {};
  public categoriasService: CategoriasService = inject(CategoriasService);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }
  
  showDetailModal(item: ICategoria, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }


  handleFormAction(item: ICategoria) {
    this.categoriasService.update(item);
  }

  deleteGame(item: ICategoria) {
    this.categoriasService.delete(item);
  }
}
