import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Food } from './food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  baseUrl = "http://localhost:3001/foods";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, color: string): void {
    this.snackBar.open(msg, '', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: [color]
    });
  }

  create(food: Food): Observable<Food> {
    return this.http.post<Food>(this.baseUrl, food).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro na requisição!', 'red-snackbar');
    return EMPTY;
  }

  read(): Observable<Food[]> {
    return this.http.get<Food[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: string): Observable<Food> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Food>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(food: Food): Observable<Food> {
    const url = `${this.baseUrl}/${food.id}`
    return this.http.put<Food>(url, food).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: string): Observable<Food> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Food>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}
