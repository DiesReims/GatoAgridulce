import { Component, OnInit } from '@angular/core';
import { Receta } from '../Modelos/Recetas';
import { RecetasService} from '../recetas.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
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
    }else {
      console.log(this.recetas);
    }
  }

  private editar(_id: number) {
    this.router.navigateByUrl('//recetasDetalle//' + _id);
  }

  private eliminar(_id: number): void {
    const res = alert('¿Deseas eliminar la receta?');
    if (res == null) {
      return;
    }
    // Llamar función de eliminado
  }
}
