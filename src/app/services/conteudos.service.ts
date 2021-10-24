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
export class ConteudosService {

    constructor(
    private ct: Constants,
    private http: HttpClient,
    private auth: AuthService,
    private toastr: ToastrService
    ) { }

  getList(idModulo: number, limit: number = 20, offset: number = 0): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/conteudos?idModulo=${idModulo}&limit=${limit}&offset=${offset}`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  getItem(id: number): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/conteudos/${id}`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  createItem(body: any): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.post(`${environment.apiUrl}/conteudos`, body, { headers }).pipe(
      map( response => {
        this.showMessage('Conteúdo criada com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  editItem(body: any): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.put(`${environment.apiUrl}/conteudos`, body, { headers }).pipe(
      map( response => {
        this.showMessage('Conteúdo alterado com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  deleteItem(id: number): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.delete(`${environment.apiUrl}/conteudos/${id}`, { headers }).pipe(
      map( response => {
        this.showMessage('Conteúdo excluída com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  assistirConteudo(idConteudo: number): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.post(`${environment.apiUrl}/conteudos/${idConteudo}/assistir`, {}, { headers }).pipe(
      map( response => {
        this.showMessage('Conteúdo concluído com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  getAnexos(idConteudo): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/conteudos/${idConteudo}/anexos`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  getAnexo(idAnexo): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/conteudos/anexos/${idAnexo}`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  deleteAnexo(idAnexo): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.delete(`${environment.apiUrl}/conteudos/anexos/${idAnexo}`, { headers }).pipe(
      map( response => {
        this.showMessage('Anexo excluído com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  createAnexo(idConteudo: number, model: any, file: any): Observable<any> {
    const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
    const formData = new FormData();
    formData.append('model', JSON.stringify(model));
    formData.append('file', file);
    return this.http.post(`${environment.apiUrl}/conteudos/${idConteudo}/anexos`, formData, { headers }).pipe(
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
