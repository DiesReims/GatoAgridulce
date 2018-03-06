import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormGroup, Validators } from '@angular/forms';

import { AppComponent } from './app.component';
import { RecetasComponent } from './recetas/recetas.component';
import { AppRoutingModule } from './/app-routing.module';
import { RecetasDetalleComponent } from './recetas-detalle/recetas-detalle.component';
import { RecetasService } from './recetas.service';
import { ClientesComponent } from './clientes/clientes.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    RecetasComponent,
    RecetasDetalleComponent,
    ClientesComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormGroup,
    Validators
  ],
  providers: [RecetasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
