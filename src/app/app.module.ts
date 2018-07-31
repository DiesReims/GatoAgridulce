import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RecetasComponent } from './recetas/recetas.component';
import { AppRoutingModule } from './app-routing.module';
import { RecetasDetalleComponent } from './recetas-detalle/recetas-detalle.component';
import { RecetasService } from './recetas.service';
import { ClientesComponent } from './clientes/clientes.component';
import { MainComponent } from './main/main.component';
import { ClientesDetalleComponent } from './clientes-detalle/clientes-detalle.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosDetalleComponent } from './usuarios-detalle/usuarios-detalle.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UsuariosService } from './usuarios.service';

@NgModule({
  declarations: [
    AppComponent,
    RecetasComponent,
    RecetasDetalleComponent,
    ClientesComponent,
    MainComponent,
    ClientesDetalleComponent,
    LoginComponent,
    UsuariosComponent,
    UsuariosDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [RecetasService, AngularFireModule, AngularFireDatabase, UsuariosService],
  bootstrap: [AppComponent]

})
export class AppModule { }
