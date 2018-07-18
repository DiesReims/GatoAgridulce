import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Login } from '../Modelos/Login';

@Component({
  selector: 'app-usuarios-detalle',
  templateUrl: './usuarios-detalle.component.html',
  styleUrls: ['./usuarios-detalle.component.css']
})
export class UsuariosDetalleComponent implements OnInit {
  private usuario: Login;
  private actionMode: string;
  private usuarioDoc: AngularFirestoreDocument<Login>;
  private usuario$: Observable<Login>;
  private keyUsuario: string;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private afs: AngularFirestore) {}

  ngOnInit() {
    // Nuevo Flujo
    const keyUsuarios = this.route.snapshot.paramMap.get('key');
    console.log('La clave recibida es: ' + keyUsuarios);
    if (keyUsuarios == null) {
      this.actionMode = 'Nuevo';
      this.usuario = new Login();
      } else {
        this.actionMode = 'Editar';
        this.keyUsuario = keyUsuarios;
        // this.receta: Receta;
        // Consultamos la receta y cargamos la información al objeto.
        this.obtenerReceta(keyUsuarios);
        }
  }

  guardarElemento(): void {
    // this.recetaService.addReceta(this.receta);
    this.afs.collection('Usuarios').add({strUsuario: this.usuario.strUsuario,
      strPassword: this.usuario.strPassword});
    alert('Se guardo de forma correcta el usuario.');
    this.salir();
  }

  obtenerReceta(usuarioId: string): void {
    // this.recetaService.getRecetas();
      this.usuarioDoc = this.afs.doc('Usuarios/' + usuarioId);
      this.usuario$ = this.usuarioDoc.valueChanges();
      this.usuario$.subscribe(data => this.usuario = data);
  }

  editarUsuario(usuarioId: string): void {
    this.afs.doc('Usuarios/' + usuarioId).update(this.usuario).then(() => {
      alert('Se ha actualizado de forma correcta');
      this.salir();
    }).catch(err => console.log(err));
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
