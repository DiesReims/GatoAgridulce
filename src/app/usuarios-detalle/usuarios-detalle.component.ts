import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario } from '../Modelos/Usuario';

@Component({
  selector: 'app-usuarios-detalle',
  templateUrl: './usuarios-detalle.component.html',
  styleUrls: ['./usuarios-detalle.component.css']
})
export class UsuariosDetalleComponent implements OnInit {
  private usuario: Usuario;
  private actionMode: string;
  private usuarioDoc: AngularFirestoreDocument<Usuario>;
  private usuario$: Observable<Usuario>;
  private keyUsuario: string;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private afs: AngularFirestore) {}

  ngOnInit() {
    const keyUsuarios = this.route.snapshot.paramMap.get('key');
    if (keyUsuarios == null) {
      this.actionMode = 'Nuevo';
      this.usuario = new Usuario();
      } else {
        this.actionMode = 'Editar';
        this.keyUsuario = keyUsuarios;
        this.obtenerUsuario(keyUsuarios);
        }
  }

  private guardarElemento(): void {
    this.afs.collection('Usuarios').add({strUsuario: this.usuario.strUsuario,
      strPassword: this.usuario.strPassword}).then(() => {
        alert('Se guardó de forma correcta el usuario.');
        this.salir();
      }).catch(error => {
        alert('Ha ocurrido un error al registrar el usuario.');
        console.log('Error: ' + error);
        this.salir();
      });
    }

   private obtenerUsuario(usuarioId: string): void {
      this.usuarioDoc = this.afs.doc('Usuarios/' + usuarioId);
      this.usuario$ = this.usuarioDoc.valueChanges();
      this.usuario$.subscribe(data => this.usuario = data,
      error => {
        alert('Ha ocurrido un error al consultar el usuario.');
        console.log('Error: ' + error);
        this.salir();
      });
  }

  private editarUsuario(usuarioId: string): void {
    this.afs.doc('Usuarios/' + usuarioId).update(this.usuario).then(() => {
      alert('Se ha actualizado de forma correcta');
      this.salir();
    }).catch(error => {
      alert('Ha ocurrido un error al registrar el usuario.');
      console.log('Error: ' + error);
      this.salir();
    });
  }

  private salir(): void {
    this.router.navigateByUrl('/usuarios');
  }

  private Procesar(usuarioId: string): void {
    if (this.actionMode === 'Editar') {
      this.editarUsuario(usuarioId);
    } else {
      this.guardarElemento();
    }
  }

}
