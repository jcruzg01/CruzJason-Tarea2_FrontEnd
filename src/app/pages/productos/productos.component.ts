import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ICategoria } from '../../interfaces';
import { ProductosListComponent } from '../../components/productos/productos-list/productos-list.component';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categoria.service';
import { ProductosFormComponent } from '../../components/productos/productos-form/productos-form.component';

@Component({
    selector: 'app-categorias',
    standalone: true,
    imports: [
        CommonModule,
        ProductosListComponent,
        ProductosFormComponent,
        LoaderComponent,
        ModalComponent,
    ],
    templateUrl: './productos.component.html',
    styleUrl: './productos.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductosComponent implements OnInit{

    public productosService: ProductosService = inject(ProductosService);
    public categoriasService: CategoriasService = inject(CategoriasService);
    public route: ActivatedRoute = inject(ActivatedRoute);
    public authService: AuthService =  inject(AuthService);
    public routeAuthorities: string[] =  [];

    ngOnInit(): void {
        this.productosService.getAll();
        this.categoriasService.getAll();
    }
    
    handleFormAction(item: ICategoria){
        this.productosService.save(item);
    }
 }
