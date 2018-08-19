import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Usuario } from '../Modelos/Usuario';
import { Observable } from 'rxjs';

export interface User { strUsuario: string; strPassword: number; }
export interface UserId extends User { id: string; }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private objPost: Usuario;
  private usersCollection: AngularFirestoreCollection<User>;
  private usuarios$: Observable<any[]>;
  private listaUsuariosRevision: UserId[];

  constructor(fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private afs: AngularFirestore) {
    this.loginForm = fb.group({
      'strUsuario': [null, Validators.compose([Validators.required, Validators.maxLength(25)])],
      'strPassword': [null, Validators.compose([Validators.required, Validators.maxLength(25)])]
    });
  }

  ngOnInit() {
  }

  private logear(_post: any): void {
    try {
      this.objPost = _post;
      // TODO:Logica de servicio y validación...
      this.usersCollection = this.afs.collection('Usuarios', ref => ref.where('strPassword', '==', this.objPost.strPassword)
        .where('strUsuario', '==', this.objPost.strUsuario));
      // Obtener la lista del Observable.
      this.usuarios$ = this.usersCollection.snapshotChanges().pipe(map(action => {
        return action.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
      this.usuarios$.subscribe(data => this.listaUsuariosRevision = data,
        error => console.log('Ha ocurrido un error: ' + error));
        if (this.isUserValid()) {
          this.showMessageLoginValid();
          this.router.navigate(['recetas']);
        } else {
          this.showMessageLoginInvalid();
        }
    } catch (_e) {
      alert('Ha ocurrido un error al tratar la acción.');
      console.log(_e);
    }
  }

  private isUserValid(): boolean {
    return this.listaUsuariosRevision.length > 0;
  }

  private showMessageLoginValid(): void {
     alert('¡Bienvenido ' + this.listaUsuariosRevision[0].strUsuario + '!');
    }

  private showMessageLoginInvalid(): void {
    alert('¡El usuario o contraseña no son validos!');
  }
}
