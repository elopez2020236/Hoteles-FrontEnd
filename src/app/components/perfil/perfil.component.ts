import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {
  public perfilModelGet: Usuario;
  public perfilModelGetId: Usuario;
  public token;

  constructor(
    public sUsuario: UsuarioService,
    private _router: Router
  ) {
    this.perfilModelGetId = new Usuario(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      [{}]
    );
    this.token = this.sUsuario.getToken();
   }

  ngOnInit(): void {
    this.getUsuarioL()
  }

  

  getUsuarioL() {
    this.sUsuario.usuarioLogeado(this.token).subscribe(
      (response) => {
        this.perfilModelGet = response.usario;
        console.log(response);
      },
      (err) => {
        console.log(<any>err)
      }
    )
  }

  putUsuario() {
    this.sUsuario.editarUsuario(this.perfilModelGetId, this.token).subscribe(
      (response) => {
        console.log(response);
        this.getUsuarioL();
      },
      (error) => {
        console.log(error);
      }
    )
  }


  deleteUsuario(id) {
    this.sUsuario.eliminarUsuario(id, this.token).subscribe(
      (response) => {
        console.log(response);

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

  
}
