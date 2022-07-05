import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { InterfazComponent } from './components/interfaz/interfaz.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { SearchHotelPipe } from './pipes/search-hotel.pipe';
import { SingUpGerenteComponent } from './components/sing-up-gerente/sing-up-gerente.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { GraficasComponent } from './components/graficas/graficas.component';
import { UsuarioService } from './services/usuario.service';
import { AuthTokenInterceptor } from './auth-token.interceptor';

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
    ServiciosComponent,
    InterfazComponent,
    EventosComponent,
    SearchHotelPipe,
    SingUpGerenteComponent,
    GraficasComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
  ],

  providers: [
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
