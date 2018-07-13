import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Login } from '../Modelos/Login';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  private sinRegistros = false;
  private usuariosAFS: AngularFirestoreCollection<Login>;
  private usuarios$: Observable<any[]>;

  constructor(private router: Router,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.usuariosAFS = this.afs.collection('Usuarios');
    this.usuarios$ = this.usuariosAFS.snapshotChanges().pipe(map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Login;
        const id = a.payload.doc.id;
        console.log('Id: ' + id + ', Objeto: ' + data);
        return { id, data };
      });
    }));
  }

  private editar(_key: string): void {
    const loadPage = this.router.navigate(['usuariosDetalle', _key]);
    loadPage.then((val) => {
      if (val) {
        console.log('Se cargo de forma correcta pantalla de edición');
      }else {
        console.log('No se logró cargar de forma correcta');
      }
    }, (err) => {
      alert('Ocurrio un error al momento de cargar la pantalla' + err);
    });
  }

  private eliminar(_key: string): void {
    const res = confirm('¿Deseas eliminar el usuario?');
    if (res === false) {
      return;
    } else {
      this.afs.doc('Usuarios/' + _key).delete();
    }
  }

}
