import { Injectable } from '@angular/core';
import { Receta } from './Modelos/Recetas';

@Injectable()
export class RecetasService {
private recetas =  new Array<Receta>();
  constructor() { }


  public obtenerRecetas(): Receta[] {
    return this.recetas;
  }

  public obtenerReceta(_id: number): Receta {
    return this.recetas.find(c => c.id === _id);
  }

  public guardarReceta(_receta: Receta): boolean {
    this.recetas.push(_receta);
    return true;
  }
}
