import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Menu } from './menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  baseUrl = "http://localhost:3001/menuList";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, color: string): void {
    this.snackBar.open(msg, '', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: [color]
    });
  }

  create(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.baseUrl, menu).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro na requisição!', 'red-snackbar');
    return EMPTY;
  }

  read(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: string): Observable<Menu> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Menu>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(menu: Menu): Observable<Menu> {
    const url = `${this.baseUrl}/${menu.id}`
    return this.http.put<Menu>(url, menu).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: string): Observable<Menu> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Menu>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}
