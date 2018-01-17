import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RecetasComponent } from './recetas/recetas.component';
import { RecetasDetalleComponent } from './recetas-detalle/recetas-detalle.component';

const routes: Routes = [
  { path: '', redirectTo: '/recetas', pathMatch: 'full' },
  { path: 'recetas', component: RecetasComponent },
  {path: 'recetasDetalle', component: RecetasDetalleComponent},
  { path: 'recetasDetalle:id', component: RecetasDetalleComponent }
];

@NgModule({
      imports: [ RouterModule.forRoot(routes) ],
      exports: [RouterModule]
})


export class AppRoutingModule { }
