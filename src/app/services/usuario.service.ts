import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  public token;
  public identidad;
  public sesionSubject: BehaviorSubject<any>;
  public isAuthenticated: Observable<any>;

  constructor(public _http: HttpClient) {
    var token = localStorage.getItem('token');

    this.sesionSubject = new BehaviorSubject<any>(token);
    this.isAuthenticated = this.sesionSubject.asObservable();
  }

  obtenerUsuario(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verUsuario', {
      headers: this.headersVariable,
    });
  }

  login(usuario, obtenerToken = null): Observable<any> {
    if (obtenerToken != null) {
      usuario.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/login', params, {
      headers: this.headersVariable,
    })
    .pipe(map((res: any) => {
      if (obtenerToken) {
        this.sesionSubject.next(res.token);
      }

      return res;
    }));
  }

  getToken() {
    var token2 = localStorage.getItem('token');
    if (token2 != undefined) {
      this.token = token2;
    } else {
      this.token = '';
    }

    return this.token;
  }

  getIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if (identidad2 != undefined) {
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }

    return this.identidad;
  }

  registrarUsuario(modelUser: Usuario): Observable<any> {
    let parametros = JSON.stringify(modelUser);
    return this._http.post(this.url + '/registrarUsuario', parametros, {
      headers: this.headersVariable,
    });
  }

  registrarGerente(modelUser: Usuario): Observable<any> {
    let parametros = JSON.stringify(modelUser);
    return this._http.post(this.url + '/crearGerente', parametros, {
      headers: this.headersVariable,
    });
  }

  clearToken() {
    localStorage.clear();

    this.sesionSubject.next(null);
  }
}
