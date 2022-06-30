import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [UsuarioService],
})
export class SignInComponent implements OnInit {
  public userModel: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.userModel = new Usuario('', '', '', '', '', '', '');
  }

  ngOnInit(): void {}

  getToken() {
    this._usuarioService.login(this.userModel, 'true').subscribe(
      (response) => {
        console.log(response.token);
        localStorage.setItem('token', response.token);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
  getTokenPromesa(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._usuarioService.login(this.userModel, 'true').subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          resolve(response);
        },
        (error) => {
          console.log(<any>error);
        }
      );
    });
  }
  login() {
    this._usuarioService.login(this.userModel).subscribe(
      (response) => {
        this.getTokenPromesa().then((respuesta) => {
          console.log(respuesta);
          localStorage.setItem('identidad', JSON.stringify(response.usuario));

          this._router.navigate(['/hoteles']);
        });
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
      },
      (error) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: error.error.mensaje,
        });
      }
    );
  }
}
