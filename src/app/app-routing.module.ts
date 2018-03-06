import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RecetasComponent } from './recetas/recetas.component';
import { RecetasDetalleComponent } from './recetas-detalle/recetas-detalle.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MainComponent } from './main/main.component';
import { ClientesDetalleComponent } from './clientes-detalle/clientes-detalle.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {path:'main', component: MainComponent},
  { path: 'recetas', component: RecetasComponent },
  {path: 'recetasDetalle', component: RecetasDetalleComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientesDetalle', component: ClientesDetalleComponent},
  { path: 'recetasDetalle:id', component: RecetasDetalleComponent }
];

@NgModule({
      imports: [ RouterModule.forRoot(routes) ],
      exports: [RouterModule]
})


export class AppRoutingModule { }
