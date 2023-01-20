import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './mock-clientes';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor() {}

  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }

  getCliente(id: number): Observable<Cliente | undefined> {
    return of(CLIENTES.find((c) => c.id === id));
  }

  modificarCliente(cliente: Cliente): Observable<Cliente> {
    const idx = CLIENTES.findIndex((c) => c.id === cliente.id);
    CLIENTES[idx] = cliente;
    return of(cliente);
  }

  nuevoCliente(cliente: Cliente): Observable<Cliente> {
    cliente.id = CLIENTES.length > 0 ? Math.max(...CLIENTES.map((c) => c.id)) + 1 : 1;
    CLIENTES.push(cliente);
    return of(cliente);
  }

  borrarCliente(id: number): Observable<any> {
    const idx = CLIENTES.findIndex((c) => c.id == id);
    if (idx >= 0) {
      CLIENTES.splice(idx, 1);
    }
    return of({});
  }
}
