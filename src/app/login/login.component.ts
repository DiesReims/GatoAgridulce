import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {Login} from '../Modelos/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm:FormGroup;
  objPost:any;
  private objLogin: Login;

  constructor(fb: FormBuilder, 
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {
    this.loginForm = fb.group({
      'strUsuario':[null, Validators.compose([Validators.required, Validators.maxLength(25)])],
      'strPassword':[null, Validators.compose([Validators.required, Validators.maxLength(25)])]
    })
   }

  ngOnInit() {
  }

  logear(_post:any):void {
    this.objPost = _post;
    //TODO:Logica de servicio y validación...
    //TODO:Servicio para manejar inicios de sesión.
    if (_post.strUsuario === "diego" && _post.strPassword==="aide")
    {
      this.router.navigateByUrl('/main');
    }
    else{
      alert("Inicio de sesión no válido.");
    }
  }

}
