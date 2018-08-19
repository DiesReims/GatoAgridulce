import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
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
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-70%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({ opacity: 1, transform: 'translateY(-70%)', offset: 1 }),
          ]))]), { optional: true })
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
  }

  private editar(_key: string): void {
    const loadPage = this.router.navigate(['recetasDetalle', _key]);
    loadPage.then((val) => {
      if (!val) {
        console.log('¡No se pudo cargar la pantalla!');
      }
    }, _e => {
      alert('¡No se pudo cargar la pantalla!');
      console.log('Error: ' + _e);
    }).catch(_e => {
      alert('Ha ocurrido un error al cargar la pantalla.');
      console.log('Error: ' + _e);
    });
  }

  private eliminar(_key: string): void {
    if (!this.askConfirmDelete()) {
      return;
    }
    this.afs.doc('Recetas/' + _key).delete().then(() => {
      alert('Se ha eliminado de forma correcta.');
    }).catch(_e => {
      alert('Ha ocurrido un error al eliminar la receta, espere e intente nuevamente.');
      console.log('Error: ' +  _e);
    });
  }

  private askConfirmDelete(): boolean {
    return confirm('¿Deseas eliminar la Receta?');
  }

}
