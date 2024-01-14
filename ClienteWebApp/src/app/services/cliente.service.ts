import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlClientes = '/api-cliente';
  //private urlSeguridad = 'http://localhost:30002';
  constructor(private http: HttpClient) {}


  registrarCliente(cliente: any, token: string): Observable<any> {
    const headers = { 'Authorization': token };
    return this.http.post<any>(`${this.urlClientes}/clientes/registrar`, cliente, { headers });
  }
}
