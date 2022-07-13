import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  public usuarioModelGet: Usuario;
  public usuarioModelPost: Usuario;
  public token;

  constructor( 
    public sUsuario: UsuarioService,
    private _router: Router
             ) {

              this.usuarioModelPost = new Usuario(
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
    this.getUsuario();
  }

  getUsuario() {
    this.sUsuario.obtenerUsuario(this.token).subscribe(
      (response) => {
        this.usuarioModelGet = response.usuario;
        console.log(response);
      },
      (err) => {
        console.log(<any>err)
      }
    )
  }

  postGerente() {
    this.sUsuario.registrarGerente(this.usuarioModelPost).subscribe(
      (response) => {
        console.log(response);
        this.usuarioModelPost._id = '';
        this.usuarioModelPost.nombre = '';
        this.usuarioModelPost.email = '';
        this.usuarioModelPost.password = '';
        this._router.navigate(['hoteles']);
        Swal.fire({
          icon: 'success',
          title: 'Registro completado con exito',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}
