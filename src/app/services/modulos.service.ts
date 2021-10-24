import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from './constants';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ModuloModel } from './../models/modulo.model';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

    constructor(
    private ct: Constants,
    private http: HttpClient,
    private auth: AuthService,
    private toastr: ToastrService
    ) { }

  getList(idTrilha: number, limit: number = 20, offset: number = 0): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/modulos?idTrilha=${idTrilha}&limit=${limit}&offset=${offset}`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );;
  }

  getItem(id: number): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/modulos/${id}`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );;;
  }

  createItem(body: ModuloModel): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.post(`${environment.apiUrl}/modulos`, body, { headers }).pipe(
      map( response => {
        this.showMessage('Trilha criada com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  editItem(body: ModuloModel): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.put(`${environment.apiUrl}/modulos`, body, { headers }).pipe(
      map( response => {
        this.showMessage('Trilha alterada com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  deleteItem(id: number): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.delete(`${environment.apiUrl}/modulos/${id}`, { headers }).pipe(
      map( response => {
        this.showMessage('Trilha excluída com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }


  errorHandler(e: any): Observable<any> {
    if(e.status === 401) {
      this.showMessage('Ocorreu um erro!', 'Por favor, tente novamente mais tarde.', true);
    } else {
      this.showMessage('Ocorreu um erro!', 'Por favor, verique os campos ou tente novamente mais tarde.', true);

    }
    return throwError(e);
  }

  showMessage(title: string, message:string = '', isError: boolean = false): void {
    if(isError) {
      this.toastr.error( message, title, {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
      });
    } else {
      this.toastr.success(message, title,  {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
      });
    }
  }
}
