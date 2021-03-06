import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RecetasComponent } from './recetas/recetas.component';
import { RecetasDetalleComponent } from './recetas-detalle/recetas-detalle.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MainComponent } from './main/main.component';
import { ClientesDetalleComponent } from './clientes-detalle/clientes-detalle.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosDetalleComponent } from './usuarios-detalle/usuarios-detalle.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'recetas', component: RecetasComponent },
  {path: 'recetasDetalle', component: RecetasDetalleComponent},
  {path: 'recetasDetalle/:key', component: RecetasDetalleComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuariosDetalle', component: UsuariosDetalleComponent},
  {path: 'usuariosDetalle/:key', component: UsuariosDetalleComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientesDetalle/:key', component: ClientesDetalleComponent}
];

@NgModule({
      imports: [ RouterModule.forRoot(routes) ],
      exports: [RouterModule]
})


export class AppRoutingModule { }
