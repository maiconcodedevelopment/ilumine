import { AuthService } from 'src/app/auth/auth.service';
import { DepoimentoModel } from 'src/app/models/depoimento.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, EmptyError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from './constants';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
  })
  export class DepoimentosService {
    constructor(private ct: Constants, private http: HttpClient, private auth: AuthService, private toastr: ToastrService) { }

    getList(limit: number = 20, offset: number = 0): Observable<DepoimentoModel[]> {
      return this.http.get<DepoimentoModel[]>(`${environment.apiUrl}/depoimentos?limit=${limit}&offset=${offset}`);
    }

    getItem(id: number): Observable<DepoimentoModel> {
      return this.http.get<DepoimentoModel>(`${environment.apiUrl}/depoimentos/${id}`);
    }

    createItem(body: DepoimentoModel): Observable<any> {
      const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.post(`${environment.apiUrl}/depoimentos`, body, { headers }).pipe(
        map( response => {
          this.showMessage('Depoimento criado com sucesso');
          return response;
        }),
        catchError(e => this.errorHandler(e))
      );
    }

    editItem(body: DepoimentoModel): Observable<any> {
      const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.put(`${environment.apiUrl}/depoimentos`, body, { headers }).pipe(
        map( response => {
          this.showMessage('Depoimento alterado com sucesso');
          return response;
        }),
        catchError(e => this.errorHandler(e))
      );
    }

    deleteItem(id: number): Observable<any> {
      const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.delete(`${environment.apiUrl}/depoimentos/${id}`, { headers }).pipe(
        map( response => {
          this.showMessage('Depoimento Excluido com sucesso');
          return response;
        }),
        catchError(e => this.errorHandler(e))
      );;
    }

    errorHandler(e: any): Observable<any> {
      this.showMessage('Ocorreu um erro!', 'Por favor, verique os campos ou tente novamente mais tarde.', true);
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
