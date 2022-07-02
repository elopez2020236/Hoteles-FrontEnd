import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleHabitacionComponent } from './components/detalle-habitacion/detalle-habitacion.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { HomeComponent } from './components/home/home.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'hoteles', component: HotelesComponent },
  { path: 'habitaciones', component: HabitacionesComponent},
  { path: 'eventos', component: EventosComponent},
  { path: 'detalleHabitacion/:idHabitacion', component: DetalleHabitacionComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
