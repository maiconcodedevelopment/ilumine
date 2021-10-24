import { UserProfile } from './../models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from './constants';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  profile;
  constructor(
    private ct: Constants,
    private http: HttpClient,
    private auth: AuthService,
    private toastr: ToastrService
    ) { }

  getRelatorio(perfil: string): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/users/Relatorio/${perfil}`, { headers, responseType: 'blob'});
  }

  getList(limit: number = 20, offset: number = 0, type: number): Observable<any> {
    // Tipo de usuário (0=Todos, 1=Admins, 2=Mentorados, 3=Educadores)
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/users?limit=${limit}&offset=${offset}&tipo=${type}`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  getById(id: number): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/users/${id}`, { headers }).pipe(
      map( response => {
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  getProfile(): Observable<any> {
    if (this.profile) {
      return new Observable(observer => observer.next(this.profile));
    } else {
      const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
      return this.http.get(`${environment.apiUrl}/users/${this.auth.currentUser.id}`, { headers }).pipe(
        map( response => {
          this.profile = response;
          this.auth.currentUser.userProfile = response;
          return response;
        }),
        catchError(e => this.errorHandler(e))
      );
    }
  }

  public UpdateProfile() {
    var user: any;
    if (this.auth.currentUser) {
      return this.getProfile().subscribe(data=>user = data);
    }
    else {
      user = undefined;
    }
    return user;
  }

  createUser(model: any, file?:any): Observable<any> {
    const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
    const formData = new FormData();
    formData.append('model', JSON.stringify(model));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post(`${environment.apiUrl}/users`, formData, { headers }).pipe(
      map( response => {
        this.showMessage('Usuário criado com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  editUser(model: any, file?:any): Observable<any> {
    const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
    const formData = new FormData();
    formData.append('model', JSON.stringify(model));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put(`${environment.apiUrl}/users`, formData, { headers }).pipe(
      map( response => {
        this.showMessage('Alteração feita com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  editMentoria(idEducador: number, idMentorado: number, acao: number): Observable<any> {
    // 1=Solicitar mentoria, 2=Cancelar solicitacao de mentoria, 3=Aceitar Mentoria, 4=Recusar Mentoria
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.patch(`${environment.apiUrl}/users?idMentorado=${idMentorado}&IdEducador=${idEducador}&acao=${acao}`, {}, { headers }).pipe(
      map( response => {
        this.showMessage('Ação realizada com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }


  deleteUser(id: number): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.delete(`${environment.apiUrl}/users/${id}`, { headers }).pipe(
      map( response => {
        this.showMessage('Usuário excluído com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }


  errorHandler(e: any): Observable<any> {
    if(e.status === 401) {
      this.showMessage('Ocorreu um erro!', 'Por favor, tente novamente mais tarde.', true);
    } else if(e.status === 400 || e.status === 404) {
      this.showMessage('Ocorreu um erro!', e.error, true);
    } else {
      this.showMessage('Ocorreu um erro!', 'Por favor, tente novamente mais tarde.', true);
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
