import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private urlSeguridad = '/api-seguridad';
  //private urlSeguridad = 'http://localhost:30001';
  constructor(private http: HttpClient) { }
  obtenerToken(): Observable<string> {
    return this.http.post<{token: string}>(`${this.urlSeguridad}/generate-security-token`, {})
      .pipe(map(response => response.token));
  }

}
