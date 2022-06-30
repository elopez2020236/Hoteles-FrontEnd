import { Component, OnInit } from '@angular/core';
import { Habitaciones } from 'src/app/models/habitacion.models';
import { HabitacionService } from 'src/app/services/habitacion.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss'],
  providers: [HabitacionService]
})
export class HabitacionesComponent implements OnInit {

  //Variable para almacenar todos los datos que obtenga de mi Get
  public habitacionModelGet: Habitaciones;
  public habitacionModelPost: Habitaciones;
  public habitacionModelGetId: Habitaciones;

  constructor(private _habitacionService: HabitacionService) {
    this.habitacionModelPost = new Habitaciones(
      '',
      '',
      '',
      '',
      '',
      ''
      );

      this.habitacionModelGetId = new Habitaciones('', '', '', '', '', '');
  }

  ngOnInit(): void {
    console.log('Hola Mundo');
    this.getHabitaciones();
  }

  getHabitaciones() {
    this._habitacionService.obtenerHabitaciones().subscribe(
      (response) => {
        this.habitacionModelGet = response.habitaciones;
        console.log(this.habitacionModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  postHabitaciones() {
    this._habitacionService.agregarHabitacion(this.habitacionModelPost).subscribe(
      (response) => {
        console.log(response);
        this.getHabitaciones();

        this.habitacionModelPost.tipoHabitacion = '';
        this.habitacionModelPost.numeroHabitacion = '';
        this.habitacionModelPost.numeroPiso = '';
        this.habitacionModelPost.precio = '';
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  deleteHabitacion(id) {
    this._habitacionService.eliminarHabitacion(id).subscribe(
      (response) => {
        console.log(response);
        this.getHabitaciones();
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  //Funcion para editar Habitaciones
  getHabitacionId(idHabitacion){
    this._habitacionService.obtenerHabitacionId(idHabitacion).subscribe(
      (response) => {
        console.log(response);
        this.habitacionModelGetId = response.habitacion;
      },
      (error) => {
        console.log(error);
      }
    )
  }


  putHabitacion() {
    this._habitacionService.editarHabitacion(this.habitacionModelGetId).subscribe(
      (response) => {
        console.log(response);
        this.getHabitaciones();
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
