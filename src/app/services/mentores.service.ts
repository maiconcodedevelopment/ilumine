import { AuthService } from 'src/app/auth/auth.service';
import { DepoimentoModel } from 'src/app/models/depoimento.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, EmptyError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from './constants';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MentorProfile, UserProfile } from '../models/user.model';
import { SolicitacaoMentoria } from '../models/solicitacao-mentoria';

@Injectable({
    providedIn: 'root'
  })
  export class MentoresService {
    constructor(private ct: Constants, private http: HttpClient, private auth: AuthService, private toastr: ToastrService) { }

    getListAdmin(limit: number = 20, offset: number = 0): Observable<MentorProfile[]> {
      const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.get<MentorProfile[]>(`${environment.apiUrl}/mentores?limit=${limit}&offset=${offset}`, { headers });
    }

    getList(limit: number = 20, offset: number = 0): Observable<MentorProfile[]> {
      const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.get<MentorProfile[]>(`${environment.apiUrl}/mentores/disponiveis?limit=${limit}&offset=${offset}`, { headers });
    }

    getSolicitacoes(): Observable<any> {
      const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.get<SolicitacaoMentoria[]>(`${environment.apiUrl}/mentores/solicitacoes`, { headers });
    }

    cancelarSolicitacao(idSolicitacao: number): Observable<any> {
      const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.post(`${environment.apiUrl}/mentores/mentoria/cancelar/${idSolicitacao}`, { }, { headers });
    }

    solicitarMentoria(idMentor: number): Observable<any> {
      const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.post(`${environment.apiUrl}/mentores/mentoria`, { idMentor }, { headers });
    }

    responderSolicitacao(model: any): Observable<any> {
      const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.post(`${environment.apiUrl}/mentores/mentoria/responder`, model, { headers });
    }

    getDadosMentoria(): Observable<any> {
      const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.get(`${environment.apiUrl}/mentores/mentoria/me`, { headers });
    }

    changeDadosMentoria(model: any): Observable<any> {
      const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.put(`${environment.apiUrl}/mentores/mentoria/me`, model, { headers });
    }

    getById(id: number): Observable<any> {
      const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.get(`${environment.apiUrl}/mentores/${id}`, { headers }).pipe(
        map( response => {
          return response;
        }),
        catchError(e => this.errorHandler(e))
      );
    }

    createUser(model: any, file?: any): Observable<any> {
      const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
      const formData = new FormData();
      formData.append('model', JSON.stringify(model));
      if (file) {
        formData.append('file', file);
      }
      return this.http.post(`${environment.apiUrl}/mentores`, formData, { headers }).pipe(
        map( response => {
          this.showMessage('Mentor criado com sucesso');
          return response;
        }),
        catchError(e => this.errorHandler(e))
      );
    }

    editUser(model: any, file?: any): Observable<any> {
      const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
      const formData = new FormData();
      formData.append('model', JSON.stringify(model));
      if (file) {
        formData.append('file', file);
      }
      return this.http.put(`${environment.apiUrl}/mentores`, formData, { headers }).pipe(
        map( response => {
          this.showMessage('Alteração feita com sucesso');
          return response;
        }),
        catchError(e => this.errorHandler(e))
      );
    }

    deleteUser(id: number): Observable<any> {
      const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.delete(`${environment.apiUrl}/mentores/${id}`, { headers }).pipe(
        map( response => {
          this.showMessage('Mentor excluído com sucesso');
          return response;
        }),
        catchError(e => this.errorHandler(e))
      );
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
