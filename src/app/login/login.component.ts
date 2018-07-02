import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

import { Login } from '../Modelos/Login';
import { Observable } from 'rxjs/Observable';

export interface User { strUsuario: string; strPassword: number; }
export interface UserId extends User { id: string; }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private objPost: Login;
  private usersCollection: AngularFirestoreCollection<User>;
  private usuarios$: Observable<any[]>;

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

  logear(_post: any): void {
    try {
      this.objPost = _post;
      console.log(this.objPost);
      // TODO:Logica de servicio y validación...
      this.usersCollection = this.afs.collection('Usuarios', ref => ref.where('strPassword', '==', this.objPost.strPassword)
        .where('strUsuario', '==', this.objPost.strUsuario));
        // Obtener la lista del observable.
      this.usuarios$ = this.usersCollection.snapshotChanges().map(action => {
        return action.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
