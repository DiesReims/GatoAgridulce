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
  private servicio: RecetasService;
  constructor(_sercivioReceta: RecetasService,
    private router: Router) {
    this.servicio = _sercivioReceta;
  }

  ngOnInit() {
    const recetas = this.servicio.getRecetas().snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const id = a.payload.key;
        console.log('KEY: ' + id + ", DATA: " + data);
        return {id, data};
      });
    });
    if (recetas == null) {
      this.sinRegistros = true;
    } else {
      console.log(recetas);
    }
  }

  ngOnChanges() {
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
    }
  }

}
