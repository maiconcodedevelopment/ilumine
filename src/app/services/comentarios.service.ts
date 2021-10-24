import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from './constants';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ConteudoModel } from './../models/conteudo.model';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

    constructor(
    private ct: Constants,
    private http: HttpClient,
    private auth: AuthService,
    private toastr: ToastrService
    ) { }

  getList(idConteudo: number, limit: number = 20, offset: number = 0): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/comentarios?idConteudo=${idConteudo}&limit=${limit}&offset=${offset}`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  getListAdmin(limit: number = 20, offset: number = 0): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/comentarios/admin`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  getItemAdmin(idComentario): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/comentarios/${idComentario}/admin`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(idComentario): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.delete(`${environment.apiUrl}/comentarios/${idComentario}`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  responderComentario(model: any): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.post(`${environment.apiUrl}/comentarios/resposta`, model, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  newItem(model: any): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.post(`${environment.apiUrl}/comentarios`, model, { headers }).pipe(
      map( response => {
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
