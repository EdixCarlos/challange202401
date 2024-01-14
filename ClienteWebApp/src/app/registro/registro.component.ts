import {Component, OnInit} from '@angular/core';
import {ClienteService} from "../services/cliente.service";
import {SeguridadService} from "../services/seguridad.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  cliente = { nombre: '', email: '' };
  token = '';

  constructor(private clienteService: ClienteService,
              private seguridadService: SeguridadService) {}

  ngOnInit(): void {
    this.obtenerToken();
  }

  obtenerToken(): void {
    this.seguridadService.obtenerToken().subscribe(token => {
      this.token = token;
    });
  }

  onSubmit(): void {
    this.clienteService.registrarCliente(this.cliente, this.token).subscribe(response => {
    });
  }
}
