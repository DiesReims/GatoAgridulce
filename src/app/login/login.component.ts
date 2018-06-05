import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import {Login} from '../Modelos/Login';
import { query } from '@angular/core/src/animation/dsl';
import { UsuariosService } from "../usuarios.service";
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm:FormGroup;
  private objPost:any;
  private objLogin: Login;
  private database: AngularFireDatabase;
  private usuarios: Login[];

  constructor(fb: FormBuilder, 
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  private usuariosService: UsuariosService) {
    this.loginForm = fb.group({
      'strUsuario':[null, Validators.compose([Validators.required, Validators.maxLength(25)])],
      'strPassword':[null, Validators.compose([Validators.required, Validators.maxLength(25)])]
    })
   }

  ngOnInit() {
  }

  logear(_post:any):void {
    this.objPost = _post;
    this.objLogin = new Login();
    //this.objLogin.strUsuario = this.objPost.strUsuario;
    //this.objLogin.strPassword = this.objPost.strPassword;
    //this.usuariosService.addUser(this.objLogin);
    //TODO:Logica de servicio y validación...
    //var result = this.usuariosService.getUsers(this.objPost.strUsuario, this.objPost.strPassword).valueChanges().subscribe(data => this.usuarios = data);
    const result = this.usuariosService.getUsers(this.objPost.strUsuario, this.objPost.strPassword).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const id = a.payload.key;
        return { id, data };
      });
    });
    //TODO:Servicio para manejar inicios de sesión.
    for (let user of this.usuarios)
    {
      console.log(user);
      if (this.objPost.strUsuario === user.strUsuario && this.objPost.strPassword === user.strPassword)
      {
        this.router.navigateByUrl('/main');
      }
      else{
        alert("Inicio de sesión no válido.");
      }
    }
  }

}
