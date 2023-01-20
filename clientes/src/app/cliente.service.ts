import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  URL = 'http://localhost:3000/clientes/';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.URL);
  }

  getCliente(id: number): Observable<Cliente | undefined> {
    return this.http.get<Cliente>(this.URL + id);
  }

  modificarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.URL + cliente.id, cliente);
  }

  nuevoCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.URL, cliente);
  }

  borrarCliente(id: number): Observable<any> {
    return this.http.delete(this.URL + id);
  }
}
