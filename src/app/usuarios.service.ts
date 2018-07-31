import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Usuario } from './Modelos/Usuario';

@Injectable()
export class UsuariosService {
  usuarios: AngularFireList<Usuario>;

  constructor(private af: AngularFireDatabase) { }


  getUsers(_user: string, _pass: string): AngularFireList<Usuario> {
    this.usuarios = this.af.list<Usuario>('/Usuarios', c => c.orderByChild('strUser')
      .equalTo(_user) && c.orderByChild('strPassword').equalTo(_pass));
    return this.usuarios;
  }

  addUser(_obj: Usuario): boolean {
    const list = this.af.list('/Usuarios').push(_obj);
    list.then(
      () => {
      console.log('Se agrego de forma correcta el usuario.');
      return true;
    },
    err => {console.log(err, 'Ha ocurrido un error');
    });
    return false;
  }

  removeUser(_key: string): boolean {
    const list = this.af.list('/Usuarios').remove(_key);
    list.then(
      () => {
        console.log('Se ha eliminado de forma correcta.');
        return true;
      },
      err => {console.log(err, 'Ha ocurrido un error');
      });
      return false;
  }

  replaceUser(_key: string, _obj: Usuario): boolean {
    const list = this.af.list('/Usuarios').set(_key, _obj);
    list.then(() => {
      console.log('Se ha reemplazado el valor en la base de datos.');
      return true;
    },
    err => {
    console.log(err, 'Ha ocurrido un error al reemplazar la infomación.');
    });
    return false;
  }

  updateUser(_key: string, _obj: Usuario): boolean {
    const list = this.af.list('/Usuarios').update(_key, _obj);
    list.then(() => {
      console.log('Se ha realizado de forma correcta la actualización');
      return true;
    },
    err => {
    console.log(err, 'Ha ocurrido un error al actualiazar el registro');
    });
    return false;
  }
}
