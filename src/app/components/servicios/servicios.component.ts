import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [ServicioService]
})

export class ServiciosComponent implements OnInit {

  //Variable para almacenar todos los datos que obtenga de mi Get
  public servicioModelGet: Servicio;
  public servicioModelPost: Servicio;
  public servicioModelGetId: Servicio;

  constructor(private _serviciosService: ServicioService) {
    this.servicioModelPost = new Servicio(
      '',
      '',
      ''
      );

      this.servicioModelGetId = new Servicio('', '', '');
  }

  ngOnInit(): void {
    console.log('Hola Mundo');
    this.getServicios();
  }

  getServicios() {
    this._serviciosService.obtenerServicios().subscribe(
      (response) => {
        this.servicioModelGet = response.servicios;
        console.log(this.servicioModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  postSetvicio() {
    this._serviciosService.agregarServicio(this.servicioModelPost).subscribe(
      (response) => {
        console.log(response);
        this.getServicios();

        this.servicioModelPost.nombreServicio = '';
        this.servicioModelPost.costoServicio = '';

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Servicio Agregado Correctamente',
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
          title: 'Error al agregar el servicio',
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }

  deleteServicio(id) {
    this._serviciosService.eliminarServicio(id).subscribe(
      (response) => {
        console.log(response);
        this.getServicios();

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Servicio Eliminado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  getServicioId(idServicio){
    this._serviciosService.obtenerServicioId(idServicio).subscribe(
      (response) => {
        console.log(response);
        this.servicioModelGetId = response.servicios;
      },
      (error) => {
        console.log(error);
      }
    )
  }


  putServicio() {
    this._serviciosService.editarServicio(this.servicioModelGetId).subscribe(
      (response) => {
        console.log(response);
        this.getServicios();
      },
      (error) => {
        console.log(error);
      }
    )
  }

}

//Rep reciente
