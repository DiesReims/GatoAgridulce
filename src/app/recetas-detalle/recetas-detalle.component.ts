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
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == null) {
      alert('Se requiere información adicional.');
      this.salir();
    } else {
      if (id === 0 || id < 0) {
        this.actionMode = 'Agregar.';
        this.receta = new Receta();
      } else {
        this.actionMode = 'Editar.';
        const recetaEdit = this.recetaService.obtenerReceta(id);
        console.log(recetaEdit);
        this.receta = recetaEdit;
      }
    }
  }


  guardarElemento(): void {
    if (this.receta == null) {
      alert('No se ha podido guardar tu receta.');
      return;
    }
    if (this.recetaService.guardarReceta(this.receta)) {
      if (this.receta.id == null) {
        alert('El identificador no puede ser nulo');
        return;
      }
      if (this.receta.id <= 0) {
        alert('El identificador no puede ser negativo o cero.');
        return;
      }
      alert('Guardado con éxito.');
      this.salir();
    }
  }

  private salir(): void {
    this.router.navigateByUrl('');
  }
}
