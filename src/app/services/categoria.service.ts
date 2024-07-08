import { Injectable, inject, signal } from '@angular/core';
import { ICategoria } from '../interfaces';
import { BaseService } from './base-service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})
export class CategoriasService extends BaseService<ICategoria> {
    protected override source: string = 'categorias';
    private itemListSignal = signal<ICategoria[]>([]);
    private snackBar: MatSnackBar = inject(MatSnackBar);

    get items$() {
        return this.itemListSignal;
    }

    public getAll() {
        this.findAll().subscribe({
            next: (response: any) => {
                response.reverse();
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

    public save(item: ICategoria) {
        this.add(item).subscribe({
            next: (response: any) => {
                this.itemListSignal.update((categorias: ICategoria[]) => [response, ...categorias]);
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

    public update(item: ICategoria) {
        this.add(item).subscribe({
            next: () => {
                const updatedItems = this.itemListSignal().map(categoria => categoria.id === item.id ? item : categoria);
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

    public delete(item: ICategoria) {
        this.del(item.id).subscribe({
            next: () => {
                this.itemListSignal.set(this.itemListSignal().filter(categoria => categoria.id != item.id));
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