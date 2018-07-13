import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { trigger, style, animate, keyframes, query, stagger, transition } from '@angular/animations';
import { Receta } from '../Modelos/Recetas';
import { RecetasService } from '../recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css'],
  animations: [
    trigger('Recetas', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-70%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(-70%)', offset: 1}),
          ]))]), {optional: true})
      ])
    ])
  ]
  })

export class RecetasComponent implements OnInit {
  private sinRegistros = false;
  private servicio: RecetasService;
  private recetasAFS: AngularFirestoreCollection<Receta>;
  private recetas$: Observable<any[]>;
  constructor(_sercivioReceta: RecetasService,
    private router: Router,
    private afs: AngularFirestore) {
    this.servicio = _sercivioReceta;
  }

  ngOnInit() {
    this.recetasAFS = this.afs.collection('Recetas');
    this.recetas$ = this.recetasAFS.snapshotChanges().pipe(map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Receta;
        const id = a.payload.doc.id;
        console.log('Id: ' + id + ', Objeto: ' + data);
        return { id, data };
      });
    }));
  //  if (this.recetas$ == null) {
  //    this.sinRegistros = true;
  //  } else {
  //    console.log(this.recetas$);
  //  }
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
