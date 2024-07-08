import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CategoriaListComponent } from '../../components/categorias/categorias-list/categorias-list.component';
import { CategoriasFormComponent } from '../../components/categorias/categorias-form/categorias-form.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CategoriasService } from '../../services/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ICategoria, IProducto } from '../../interfaces';

@Component({
    selector: 'app-categorias',
    standalone: true,
    imports: [
        CommonModule,
        CategoriaListComponent,
        CategoriasFormComponent,
        LoaderComponent,
        ModalComponent,
    ],
    templateUrl: './categorias.component.html',
    styleUrl: './categorias.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriasComponent implements OnInit{

    public categoriasService: CategoriasService = inject(CategoriasService);
    public route: ActivatedRoute = inject(ActivatedRoute);
    public authService: AuthService =  inject(AuthService);
    public routeAuthorities: string[] =  [];

    ngOnInit(): void {
        this.categoriasService.getAll();
    }
    
    handleFormAction(item: IProducto){
        this.categoriasService.save(item);
    }
 }
