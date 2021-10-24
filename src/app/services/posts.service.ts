import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private ct: Constants,
              private auth: AuthService,
              private toastr: ToastrService,
              private http: HttpClient) { }

  getList(limit: number = 10, offset: number = 0, destaque?: boolean): Observable<any> {
    return this.http.get(`${environment.apiUrl}/blog?limit=${limit}&offset=${offset}${destaque === undefined ? '' : ('&destaque=' + destaque)}`);
  }

  getItem(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/blog/${id}`);
  }

  createItem(body: any, file?: any): Observable<any> {
    const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
    const formData = new FormData();
    formData.append('model', JSON.stringify(body));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post(`${environment.apiUrl}/blog`, formData, { headers }).pipe(
      map( response => {
        this.showMessage('Postagem criada com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  editItem(body: any, file?: any): Observable<any> {
    const headers = this.ct.getMultiPartAuthorizationHeader(this.auth.getCurrentUser());
    const formData = new FormData();
    formData.append('model', JSON.stringify(body));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put(`${environment.apiUrl}/blog`, formData, { headers }).pipe(
      map( response => {
        this.showMessage('Postagem alterada com sucesso');
        return response;
      }),
      catchError(e => this.errorHandler(e))
    );
  }

  deleteItem(id: number): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.delete(`${environment.apiUrl}/blog/${id}`, { headers }).pipe(
      map( response => {
        this.showMessage('Postagem excluida com sucesso');
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
