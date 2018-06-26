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
  private objPost: Login;
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
    try {
      this.objPost = _post;
      console.log(this.objPost);
      // TODO:Logica de servicio y validación...
      this.usersCollection = this.afs.collection('Usuarios', ref => ref.where('strPassword', '==', this.objPost.strPassword)
        .where('strUsuario', '==', this.objPost.strUsuario));
      this.usuarios = this.usersCollection.snapshotChanges().map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as Login;
          const id = a.payload.doc.id;
          return {id, data};
        });
    });
      for (const user of this.usuarios)
      {
        console.log('El valor es:' + user.strUsuario + 'Con pass: ' + user.strPassword);
        if (this.objPost.strUsuario === user.strUsuario && this.objPost.strPassword === user.strPassword) {
          this.router.navigateByUrl('/main');
        }
      }
      alert('Usuario o contraseña Incorrectas');
    } catch (error) {
      console.log(error);
    }
  }
}
