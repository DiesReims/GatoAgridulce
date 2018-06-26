import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Receta } from '../Modelos/Recetas';
import { RecetasService } from '../recetas.service';

@Component({
  selector: 'app-recetas-detalle',
  templateUrl: './recetas-detalle.component.html',
  styleUrls: ['./recetas-detalle.component.css']
})
export class RecetasDetalleComponent implements OnInit {
private receta: Receta;
private recetaService: RecetasService;
private actionMode: string;

  constructor(
        private _recetaService: RecetasService,
            private route: ActivatedRoute,
                private location: Location,
                      private router: Router) {
                              this.recetaService = _recetaService;
     }

  ngOnInit() {
    // Nuevo Flujo
    const keyRecetas = this.route.snapshot.paramMap.get('key');
    console.log('La clave recibida es: ' + keyRecetas);
    if (keyRecetas == null) {
      this.actionMode = 'Nuevo';
      // this.receta = new Receta();
    } else {
      this.actionMode = 'Editar';
      // this.receta: Receta;
      // Llenamos datos de receta.
    }
  }


  guardarElemento(): void {
    this.receta.key = 'HoHuJaKo';
    this.recetaService.addReceta(this.receta);
    alert('Se guardó de forma correcta la receta.');
    this.salir();
  }

  obtenerReceta(): void {
    this.recetaService.getRecetas();
  }

  private salir(): void {
    this.router.navigateByUrl('/recetas');
  }
}
