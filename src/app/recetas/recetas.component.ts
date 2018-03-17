import { Component, OnInit } from '@angular/core';
import { Receta } from '../Modelos/Recetas';
import { RecetasService } from '../recetas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  private sinRegistros: boolean = false;
  public recetas: Receta[];
  private servicio: RecetasService;
  constructor(_sercivioReceta: RecetasService,
    private router: Router) {
    this.servicio = _sercivioReceta;
  }

  ngOnInit() {
    this.recetas = this.servicio.obtenerRecetas();
    if (this.recetas == null) {
      this.recetas = new Array<Receta>();
      this.sinRegistros = true;
    } else {
      console.log(this.recetas);
    }
  }

  ngOnChanges() {
    if (this.recetas.length > 0){
      this.sinRegistros = false;
    }
  }

  private editar(_key: string): void {
    const loadPage = this.router.navigate(['recetasDetalle', _key]);
    loadPage.then((val)=>{
      if(val){
        console.log('Se cargo de forma correcta pantalla de edición');
      }
      else{
        console.log('No se logró cargar de forma correcta');
      }
    },(err)=>{
      alert('Ocurrio un error al momento de cargar la pantalla' + err);
    });
  }

  private eliminar(_key: string): void {
    const res = confirm('¿Deseas eliminar la receta?');
    if (res == false) {
      return;
    }
    else {
      // Llamar función de eliminado.
      var element = this.recetas.findIndex(c=> c.key === _key);
      this.recetas.splice(element,1);
    }
  }

}
