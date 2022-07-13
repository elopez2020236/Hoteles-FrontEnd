import { Component, OnInit } from '@angular/core';
import { carrito } from 'src/app/models/carrito.model';
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
        this.carritoModelGet.Habitacion;
        console.log(this.carritoModelGet.Habitacion);
        console.log(this.carritoModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }
}
