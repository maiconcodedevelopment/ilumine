import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User, ROLE_USUARIO } from '../models/user.model';
import { Constants } from '../services/constants';
import { environment } from 'src/environments/environment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User = this.storage.get('currentUser') || undefined;

  constructor(
    private http: HttpClient,
    public ct: Constants,
    public jwtHelper: JwtHelperService,
    private toastr: ToastrService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  public isAuthenticated(): boolean {
    if (!this.currentUser) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(this.currentUser.token);
  }

  public init(): Observable<any> {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      if (this.jwtHelper.isTokenExpired(this.currentUser.token)) {
        return this.refreshToken();
      } else {
        return new Observable(observer => { observer.next(true); });
      }
    } else {
      return new Observable(observer => { observer.next(false); });
    }
  }

  refreshToken(): Observable<boolean> {
    return new Observable(observer => {
      if (this.currentUser && this.jwtHelper.isTokenExpired(this.currentUser.token)) {
        const model = {
          token: this.currentUser.token,
          refreshToken: this.currentUser.refreshToken
        };
        const authHeader = this.ct.getAuthorizationHeader(this.currentUser);
        this.http.post(`${environment.apiUrl}/Authenticate/refresh`, model, {headers: authHeader }).subscribe((result: any) => {
          if (result && this.currentUser) {
            this.http.get(`${environment.apiUrl}/users/${result.id}`).subscribe(profile => {
              this.currentUser.token = result.auth_token;
              this.currentUser.userProfile = profile;
              this.currentUser.refreshToken = result.refresh_token;
              if (this.storage.has('currentUser')) {
                this.storage.set('currentUser', this.currentUser);
              }
              observer.next(true);
            });
          }
        }, error => {
          this.logout();
          observer.next(false);
        });
      } else {
        observer.next(false);
      }
    });
  }

  public login(credentials): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${environment.apiUrl}/authenticate/Login`, credentials).subscribe( (response: any) => {
        const headers = this.ct.getAuthorizationHeader({token: response.auth_token});
        const userRole = response.roles.indexOf('Administrador') !== -1 ? ROLE_USUARIO.ADMINISTRADOR :
                         response.roles.indexOf('Mentorado') !== -1 ? ROLE_USUARIO.MENTORADO :
                         response.roles.indexOf('Educador') !== -1 ? ROLE_USUARIO.EDUCADOR :
                         response.roles.indexOf('Mentor') !== -1 ? ROLE_USUARIO.MENTOR :
                         response.roles.indexOf('NaoInformado') !== -1 ? ROLE_USUARIO.NAOINFORMADO : null;
        this.http.get(`${environment.apiUrl}/users/${response.id}`).subscribe(profile => {
          let url = environment.apiUrl;

          switch (userRole) {
            case ROLE_USUARIO.MENTORADO:
              url = url + '/users';
              this.currentUser = {
                id: response.id,
                nome: response.nome,
                token: response.auth_token,
                refreshToken: response.refreshToken,
                userProfile: profile,
                roles: response.roles
              };
              this.storage.set('currentUser', this.currentUser);
              observer.next(response);
              observer.complete();
              break;
            case ROLE_USUARIO.EDUCADOR:
              url = url + '/users';
              this.currentUser = {
                id: response.id,
                nome: response.nome,
                refreshToken: response.refreshToken,
                token: response.auth_token,
                userProfile: profile,
                roles: response.roles
              };
              this.storage.set('currentUser', this.currentUser);
              observer.next(response);
              observer.complete();
              break;
            case ROLE_USUARIO.MENTOR:
              url = url + '/users';
              this.currentUser = {
                id: response.id,
                nome: response.nome,
                refreshToken: response.refreshToken,
                token: response.auth_token,
                userProfile: profile,
                roles: response.roles
              };
              this.storage.set('currentUser', this.currentUser);
              observer.next(response);
              observer.complete();
              break;
            case ROLE_USUARIO.NAOINFORMADO:
              observer.next(response);
              observer.complete();
              break;
            case ROLE_USUARIO.ADMINISTRADOR:
              this.currentUser = {
                id: response.id,
                nome: 'Administrador',
                token: response.auth_token,
                refreshToken: response.refreshToken,
                userProfile: profile,
                roles: response.roles
              };
              this.storage.set('currentUser', this.currentUser);
              observer.next(response);
              observer.complete();
              break;
            default:
              observer.next(false);
              observer.complete();
              break;
          }
        });

      }, error => {
        this.showMessage('Erro', 'Usuário ou Senha inválidos', true);
        observer.next(error);
        observer.complete();
      });
    });
  }

  public lembrarSenha(model: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/authenticate/forgot-password`, model);
  }

  public recuperarSenha(model: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/authenticate/reset-password`, model);
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = undefined;
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
