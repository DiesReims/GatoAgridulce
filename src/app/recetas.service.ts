import { Injectable } from '@angular/core';
import { Receta } from './Modelos/Recetas';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class RecetasService {
usuarios: AngularFireList<Receta>;
private recetas =  new Array<Receta>();
  constructor(private af: AngularFireDatabase) { }


  getRecetas(): AngularFireList<Receta> {
    this.usuarios = this.af.list<Receta>('/Recetas');
    return this.usuarios;
  }

  addReceta(_obj: Receta): boolean {
    const list = this.af.list('/Recetas').push(_obj);
    list.then(
      () => {
      console.log('Se agrego de forma correcta el usuario.');
      return true;
    },
    err => {console.log(err, 'Ha ocurrido un error');
    });
    return false;
  }

  removeReceta(_key: string): boolean {
    const list = this.af.list('/Recetas').remove(_key);
    list.then(
      () => {
        console.log('Se ha eliminado de forma correcta.');
        return true;
      },
      err => {console.log(err, 'Ha ocurrido un error');
      });
      return false;
  }

  replaceReceta(_key: string, _obj: Receta): boolean {
    const list = this.af.list('/Recetas').set(_key, _obj);
    list.then(() => {
      console.log('Se ha reemplazado el valor en la base de datos.');
      return true;
    },
    err => {
    console.log(err, 'Ha ocurrido un error al reemplazar la infomación.');
    });
    return false;
  }

  updateReceta(_key: string, _obj: Receta): boolean {
    const list = this.af.list('/Recetas').update(_key, _obj);
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
