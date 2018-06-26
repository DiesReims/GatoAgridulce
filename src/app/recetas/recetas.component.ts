import { Component, OnInit } from '@angular/core';
import { Receta } from '../Modelos/Recetas';
import { RecetasService } from '../recetas.service';
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  private sinRegistros = false;
  private servicio: RecetasService;
  private recetasAFS: AngularFirestoreCollection<Receta>;
  private recetas: any;
  constructor(_sercivioReceta: RecetasService,
    private router: Router,
    private afs: AngularFirestore) {
    this.servicio = _sercivioReceta;
  }

  ngOnInit() {
    this.recetasAFS = this.afs.collection('Recetas');
    this.recetas = this.recetasAFS.snapshotChanges().map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Receta;
        const id = a.payload.doc.id;
        console.log('Id: ' + id + ', Objeto: ' + data);
        return {id, data};
      });
    });
    if (this.recetas == null) {
      this.sinRegistros = true;
    } else {
      console.log(this.recetas);
    }
  }

  private editar(_key: string): void {
    const loadPage = this.router.navigate(['recetasDetalle', _key]);
    loadPage.then((val) => {
      if (val) {
        console.log('Se cargo de forma correcta pantalla de edición');
      }else {
        console.log('No se logró cargar de forma correcta');
      }
    }, (err) => {
      alert('Ocurrio un error al momento de cargar la pantalla' + err);
    });
  }

  private eliminar(_key: string): void {
    const res = confirm('¿Deseas eliminar la receta?');
    if (res === false) {
      return;
    } else {
      this.afs.doc('Recetas/' + _key).delete();
    }
  }

}
