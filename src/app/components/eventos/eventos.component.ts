import { Component, OnInit } from '@angular/core';
import { Eventos } from 'src/app/models/eventos.models';
import { EventosService } from 'src/app/services/eventos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [EventosService]
})

export class EventosComponent implements OnInit {

  //Variable para almacenar todos los datos que obtenga de mi Get
  public eventosModelGet: Eventos;
  public eventosModelPost: Eventos;
  public eventosModelGetId: Eventos;

  constructor(private _eventosService: EventosService) {
    this.eventosModelPost = new Eventos(
      '',
      '',
      '',
      '',
      '',
      '',
      ''
      );

      this.eventosModelGetId = new Eventos('', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    console.log('Hola Mundo');
    this.getEventos();
  }

  getEventos() {
    this._eventosService.obtenerEventos().subscribe(
      (response) => {
        this.eventosModelGet = response.eventos;
        console.log(this.eventosModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  postEventos() {
    this._eventosService.agregarEvento(this.eventosModelPost).subscribe(
      (response) => {
        console.log(response);
        this.getEventos();

        this.eventosModelPost.nombre = '';
        this.eventosModelPost.hora = '';
        this.eventosModelPost.fecha = '';
        this.eventosModelPost.asistentes = '';
        //this.eventosModelPost.hotel = '';
        //this.eventosModelPost.typeEvent = '';

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Evento Agregado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      },
      (error) => {
        console.log(<any>error);
        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al agregar el Evento',
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }

  deleteEvento(id) {
    this._eventosService.eliminarEvento(id).subscribe(
      (response) => {
        console.log(response);
        this.getEventos();

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Evento Eliminado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  //Funcion para editar Habitaciones
  getEventoId(idHabitacion){
    this._eventosService.obtenerEventoId(idHabitacion).subscribe(
      (response) => {
        console.log(response);
        this.eventosModelGetId = response.eventos;
      },
      (error) => {
        console.log(error);
      }
    )
  }


  putEvento() {
    this._eventosService.editarEventos(this.eventosModelGetId).subscribe(
      (response) => {
        console.log(response);
        this.getEventos();
      },
      (error) => {
        console.log(error);
      }
    )
  }

}

//Rep reciente
