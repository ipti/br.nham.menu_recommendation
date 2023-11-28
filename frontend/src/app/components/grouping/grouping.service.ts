import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Grouping } from './grouping.model';

@Injectable({
  providedIn: 'root'
})
export class GroupingService {

  baseUrl = "http://localhost:3001/grouping";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, color: string): void {
    this.snackBar.open(msg, '', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: [color]
    });
  }

  create(grouping: Grouping): Observable<Grouping> {
    return this.http.post<Grouping>(this.baseUrl, grouping).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro na requisição!', 'red-snackbar');
    return EMPTY;
  }

  read(): Observable<Grouping[]> {
    return this.http.get<Grouping[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: string): Observable<Grouping> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Grouping>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(grouping: Grouping): Observable<Grouping> {
    const url = `${this.baseUrl}/${grouping.id}`
    return this.http.put<Grouping>(url, grouping).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: string): Observable<Grouping> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Grouping>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}

