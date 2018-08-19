import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from '../Modelos/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  private sinRegistros = false;
  private usuariosAFS: AngularFirestoreCollection<Usuario>;
  private usuarios$: Observable<any[]>;

  constructor(private router: Router,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.usuariosAFS = this.afs.collection('Usuarios');
    this.usuarios$ = this.usuariosAFS.snapshotChanges().pipe(map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        console.log('Id: ' + id + ', Objeto: ' + data);
        return { id, data };
      });
    }));
  }

  private editar(_key: string): void {
    const loadPage = this.router.navigate(['usuariosDetalle', _key]);
    loadPage.then((val) => {
      if (!val) {
        console.log('¡No se pudo cargar la pantalla!');
      }}, _e => {
      alert('¡No se pudo cargar la pantalla!');
      console.log('Error: ' + _e);
    }).catch(_e => {
      alert('Ha ocurrido un error al cargar la pantalla.');
      console.log('Error: ' + _e);
    });
  }

  private eliminar(_key: string): void {
    if (!this.askConfirmDelete()) {
      return;
    }
      this.afs.doc('Usuarios/' + _key).delete().then(() => {
        alert('Se ha eliminado de forma correcta.');
      }).catch(_e => {
        alert('Ha ocurrido un error al eliminar el usuario, espere e intente nuevamente.');
        console.log('Error: ' +  _e);
      });
  }

  private askConfirmDelete(): boolean {
    return confirm('¿Deseas eliminar la Receta?');
  }

}
