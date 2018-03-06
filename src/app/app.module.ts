import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http'

import { AppComponent } from './app.component';
import { RecetasComponent } from './recetas/recetas.component';
import { AppRoutingModule } from './/app-routing.module';
import { RecetasDetalleComponent } from './recetas-detalle/recetas-detalle.component';
import { RecetasService } from './recetas.service';
import { ClientesComponent } from './clientes/clientes.component';
import { MainComponent } from './main/main.component';
import { ClientesDetalleComponent } from './clientes-detalle/clientes-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    RecetasComponent,
    RecetasDetalleComponent,
    ClientesComponent,
    MainComponent,
    ClientesDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [RecetasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
