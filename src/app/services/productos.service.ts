import { Injectable, inject, signal } from '@angular/core';
import { IProducto } from '../interfaces';
import { BaseService } from './base-service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})
export class ProductosService extends BaseService<IProducto> {
    protected override source: string = 'productos';
    private itemListSignal = signal<IProducto[]>([]);
    private snackBar: MatSnackBar = inject(MatSnackBar);

    get items$() {
        return this.itemListSignal;
    }

    public getAll() {
        this.findAll().subscribe({
            next: (response: any) => {
                response.reverse();
                console.log(response);
                this.itemListSignal.set(response);
                
            },
            error: (error: any) => {
                console.error('Error in get all games request', error);
                this.snackBar.open(error.error.description, 'Close', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['error-snackbar']
                });
            }
        })
    }

    public save(item: IProducto) {
        this.add(item).subscribe({
            next: (response: any) => {
                this.itemListSignal.update((productos: IProducto[]) => [response, ...productos]);
            },
            error: (error: any) => {
                console.error('response', error.description);
                this.snackBar.open(error.error.description, 'Close', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['error-snackbar']
                });
            }
        })
    }

    public update(item: IProducto) {
        this.add(item).subscribe({
            next: () => {
                const updatedItems = this.itemListSignal().map(producto => producto.id === item.id ? item : producto);
                this.itemListSignal.set(updatedItems);
            },
            error: (error: any) => {
                console.error('response', error.description);
                this.snackBar.open(error.error.description, 'Close', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['error-snackbar']
                });
            }
        })
    }

    public delete(item: IProducto) {
        this.del(item.id).subscribe({
            next: () => {
                this.itemListSignal.set(this.itemListSignal().filter(producto => producto.id != item.id));
            },
            error: (error: any) => {
                console.error('response', error.description);
                this.snackBar.open(error.error.description, 'Close', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['error-snackbar']
                });
            }
        })
    }
}