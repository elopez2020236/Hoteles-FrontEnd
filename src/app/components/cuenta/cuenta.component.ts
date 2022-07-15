import { Component, OnInit } from '@angular/core';
import { carrito } from 'src/app/models/carrito.model';
import { Habitaciones } from 'src/app/models/habitacion.models';
import { CuentaService } from 'src/app/services/cuenta.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
  providers: [CuentaService]
})
export class CuentaComponent implements OnInit {
  public carritoModelGet: carrito;
  public token;
  public role: string;
  public habitacion = [];
  public servicios = [];
  
  constructor(
    private _cuentaService: CuentaService,
    private _usuarioService: UsuarioService
  ) { 

    this.carritoModelGet = new carrito([{}], [{}], {}, 0);
    this.token = this._usuarioService.getToken();

    _usuarioService.roleUpdated.subscribe(role => {
      this.role = role;
    })
  }

  ngOnInit(): void {
    this.getCarrito();
  }



  getCarrito() {
    this._cuentaService.obtenerCarrito(this.token).subscribe(
      (response) => {
        this.carritoModelGet = response.carrito;
        this.habitacion = response.carrito.Habitacion;
        this.servicios = response.carrito.Servicios;
        console.log(this.carritoModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }
}
