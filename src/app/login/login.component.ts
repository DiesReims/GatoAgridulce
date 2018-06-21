import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

import {Login} from '../Modelos/Login';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private objPost: any;
  private usersCollection: AngularFirestoreCollection<Login>;
  private usuarios: any;

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
    this.objPost = _post;
    // TODO:Logica de servicio y validación...
    this.usersCollection = this.afs.collection('login', ref => ref.where('strPassword', '==', 'indefinido'));
    this.usuarios = this.usersCollection.snapshotChanges().map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as Login;
        const id = a.payload.doc.id;
        return {id, data};
      });
  });
    for (const user of this.usuarios)
    {
      if (this.objPost.strUsuario === user.strUsuario && this.objPost.strPassword === user.strPassword) {
        this.router.navigateByUrl('/main');
      }
    }
    alert('Usuario o contraseña Incorrecta.s');
  }
}
