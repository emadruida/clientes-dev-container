import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { CLIENTES } from '../mock-clientes';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  cliente: Cliente = {} as Cliente;

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCliente(+id);
    }
  }

  getCliente(id: number): void {
    const found = CLIENTES.find((c) => c.id === id);
    if (found) {
      this.cliente = found;
    }
  }

  guardar(): void {
    if (this.cliente.id) {
      const idx = CLIENTES.findIndex((c) => c.id === this.cliente.id);
      CLIENTES[idx] = this.cliente;
    } else {
      this.cliente.id = CLIENTES.length > 0 ? Math.max(...CLIENTES.map((c) => c.id)) + 1 : 1;
      CLIENTES.push(this.cliente);
    }
    this.location.back();
  }
}
