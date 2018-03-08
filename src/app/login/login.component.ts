import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {Login} from '../Modelos/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm:any;
  private objLogin: Login;
  constructor(fb: FormBuilder) {
   }

  ngOnInit() {
  }

  logear():boolean {
    return true;
  }

}
