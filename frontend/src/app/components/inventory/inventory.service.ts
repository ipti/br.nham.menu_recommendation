import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Inventory } from './inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  baseUrl = "http://localhost:3001/inventory";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, color: string): void {
    this.snackBar.open(msg, '', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: [color]
    });
  }

  create(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.baseUrl, inventory).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro na requisição!', 'red-snackbar');
    return EMPTY;
  }

  read(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: string): Observable<Inventory> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Inventory>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(inventory: Inventory): Observable<Inventory> {
    const url = `${this.baseUrl}/${inventory.id}`
    return this.http.put<Inventory>(url, inventory).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: string): Observable<Inventory> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Inventory>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}
