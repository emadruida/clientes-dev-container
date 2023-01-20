import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { CLIENTES } from '../mock-clientes';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  cliente: Cliente = {} as Cliente;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCliente(+id);
    }
  }

  getCliente(id: number): void {
    this.clienteService
      .getCliente(id)
      .subscribe((c) => (this.cliente = c ? c : ({} as Cliente)));
  }

  guardar(): void {
    if (this.cliente.id) {
      this.clienteService.modificarCliente(this.cliente).subscribe(() => this.location.back());
    } else {
      this.clienteService.nuevoCliente(this.cliente).subscribe(() => this.location.back());
    }
  }
}
