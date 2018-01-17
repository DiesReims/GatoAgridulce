import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { RecetasComponent } from './recetas/recetas.component';
import { AppRoutingModule } from './/app-routing.module';
import { RecetasDetalleComponent } from './recetas-detalle/recetas-detalle.component';
import { RecetasService } from './recetas.service';


@NgModule({
  declarations: [
    AppComponent,
    RecetasComponent,
    RecetasDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RecetasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
