import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Receta } from '../Modelos/Recetas';
import { RecetasService } from '../recetas.service';
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
private recetaService: RecetasService;
private actionMode: string;
private recetaDoc: AngularFirestoreDocument<Receta>;
private receta$: Observable<Receta>;
private keyReceta: string;

  constructor(
        private _recetaService: RecetasService,
            private route: ActivatedRoute,
                private location: Location,
                      private router: Router,
                       private afs: AngularFirestore) {
                              this.recetaService = _recetaService;
     }

  ngOnInit() {
    // Nuevo Flujo
    const keyRecetas = this.route.snapshot.paramMap.get('key');
    console.log('La clave recibida es: ' + keyRecetas);
    if (keyRecetas == null) {
      this.actionMode = 'Nuevo';
      this.receta = new Receta();
    } else {
      this.actionMode = 'Editar';
      this.keyReceta = keyRecetas;
      // this.receta: Receta;
      // Consultamos la receta y cargamos la información al objeto.
      this.obtenerReceta(keyRecetas);
    }
  }


  guardarElemento(): void {
    // this.recetaService.addReceta(this.receta);
    this.afs.collection('Recetas').add({strNombreReceta: this.receta.strNombreReceta,
      strDetalleReceta: this.receta.strDetalleReceta,
      intNumeroIngredientes: this.receta.intNumeroIngredientes,
      dteFechaCreacion: this.receta.dteFechaCreacion,
      decTiempoPreparacion: this.receta.decTiempoPreparacion,
      curPrecioVenta: this.receta.curPrecioVenta,
      curCostoBase: this.receta.curCostoBase});
    alert('Se guardó de forma correcta la receta.');
    this.salir();
  }

  obtenerReceta(recetaId: string): void {
    // this.recetaService.getRecetas();
      this.recetaDoc = this.afs.doc('Recetas/' + recetaId);
      this.receta$ = this.recetaDoc.valueChanges();
      this.receta$.subscribe(data => this.receta = data);
  }

  editarReceta(recetaId: string): void {
    this.afs.doc('Recetas/' + recetaId).update(this.receta).then(() => {
      alert('Se ha actualizado de forma correcta');
      this.salir();
    }).catch(err => console.log(err));
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
