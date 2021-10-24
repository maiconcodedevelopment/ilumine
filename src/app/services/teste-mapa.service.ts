import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from './constants';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TesteMapaService {

  constructor(private ct: Constants, private http: HttpClient, private auth: AuthService) { }


  getTeste(): Observable<any> {
    const headers = this.ct.getAuthorizationHeader(this.auth.getCurrentUser());
    return this.http.get(`${environment.apiUrl}/teste`, {headers});
  }

}
