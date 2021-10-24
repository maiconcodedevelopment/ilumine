import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root',
})
export class FaleConoscoService {
  constructor(private ct: Constants, private http: HttpClient) {}

  enviarContato(model): Observable<any> {
    return this.http.post(`${environment.apiUrl}/fale-conosco`, model);
  }
}
