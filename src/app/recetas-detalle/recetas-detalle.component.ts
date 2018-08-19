import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Receta } from '../Modelos/Recetas';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recetas-detalle',
  templateUrl: './recetas-detalle.component.html',
  styleUrls: ['./recetas-detalle.component.css']
})
export class RecetasDetalleComponent implements OnInit {
  private receta: Receta;
  private actionMode: string;
  private recetaDoc: AngularFirestoreDocument<Receta>;
  private receta$: Observable<Receta>;
  private keyReceta: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore) {
  }

  ngOnInit() {
    try {
      const keyRecetas = this.route.snapshot.paramMap.get('key');
      if (keyRecetas == null) {
        this.actionMode = 'Nuevo';
        this.receta = new Receta();
      } else {
        this.actionMode = 'Editar';
        this.keyReceta = keyRecetas;
        this.obtenerReceta(keyRecetas);
      }
    } catch (error) {
      console.log('Hola soy un error que el porgramador no previó: ' +  error);
    }
  }


  private guardarElemento(): void {
    this.afs.collection('Recetas').add({
      strNombreReceta: this.receta.strNombreReceta,
      strDetalleReceta: this.receta.strDetalleReceta,
      intNumeroIngredientes: this.receta.intNumeroIngredientes,
      dteFechaCreacion: this.receta.dteFechaCreacion,
      decTiempoPreparacion: this.receta.decTiempoPreparacion,
      curPrecioVenta: this.receta.curPrecioVenta,
      curCostoBase: this.receta.curCostoBase
    }).then(() => {
      alert('Se guardó de forma correcta la receta.');
      this.salir();
    }).catch(error => {
      alert('Ha ocurrido un error al registrar la receta.');
      console.log('Error: ' + error);
      this.salir();
    });
    this.salir();
  }

  private obtenerReceta(recetaId: string): void {
    this.recetaDoc = this.afs.doc('Recetas/' + recetaId);
    this.receta$ = this.recetaDoc.valueChanges();
    this.receta$.subscribe(data => this.receta = data,
    error => {
      alert('Ha ocurrido un error al consultar la receta.');
      console.log('Error: ' + error);
      this.salir();
    });
  }

  private editarReceta(recetaId: string): void {
    this.afs.doc('Recetas/' + recetaId).update(this.receta).then(() => {
      alert('Se ha actualizado de forma correcta');
      this.salir();
    }).catch(error => {
      alert('Ha ocurrido un error al modificar la receta.');
      console.log('Error: ' + error);
    });
  }

  private salir(): void {
    this.router.navigateByUrl('/recetas');
  }

  private Procesar(recetaId: string): void {
    if (this.actionMode === 'Editar') {
      this.editarReceta(recetaId);
    } else {
      this.guardarElemento();
    }
  }
}
