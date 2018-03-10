import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Login } from "../app/Modelos/Login";

@Injectable()
export class UsuariosService {
  usuarios:AngularFireList<Login>; 

  constructor(private af: AngularFireDatabase) { }


  getUsers(_user: string, _pass: string): AngularFireList<Login>{
    this.usuarios = this.af.list<Login>('/Usuarios', c => c.orderByChild('strUser').equalTo(_user) && c.orderByChild('strPassword').equalTo(_pass));
    return this.usuarios;
  }

}
