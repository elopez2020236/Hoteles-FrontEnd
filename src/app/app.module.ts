import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { DetalleHabitacionComponent } from './components/detalle-habitacion/detalle-habitacion.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    HotelesComponent,
    HabitacionesComponent,
    DetalleHabitacionComponent,
    EventosComponent,
    ServiciosComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
