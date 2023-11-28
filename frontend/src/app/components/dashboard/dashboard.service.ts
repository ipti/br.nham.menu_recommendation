import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  pythonServerUrl = "http://localhost:5000/";
  // pythonServerUrl = "http://localhost:4200/";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, color: string): void {
    this.snackBar.open(msg, '', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: [color]
    });
  }

  runRS(): Observable<any> {
    return this.http.post<any>(this.pythonServerUrl + "recommendationSystem/", {}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  getResultRS(param: any): Observable<any> {
    return this.http.post<any>(this.pythonServerUrl + "recommendationSystem/getResult", param).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro na requisição!', 'red-snackbar');
    return EMPTY;
  }
}
