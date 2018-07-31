import { Component } from '@angular/core';
import { Usuario } from './Modelos/Usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gato Agridulce';
  usuario = new Usuario();

  constructor() {
    this.usuario.strUsuario = 'Bienvenutti';
  }
}
