import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Usuario} from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class SeguridadService {
    elUsuario = new BehaviorSubject<Usuario>(new Usuario);
  constructor(private http: HttpClient, private router: Router) {
      this.verificarSesionActual();
  }

  verificarSesionActual(){
      let sesionActual = this.getDatosSesion();
      if(sesionActual){
          this.setUsuario(JSON.parse(sesionActual));
      }
  }

  getDatosSesion(){
      let sesionActual = localStorage.getItem('sesion');
      return sesionActual;
  }

  setUsuario(user: Usuario){
      this.elUsuario.next(user);
  }

  getUsuario(){
      return this.elUsuario.asObservable();
  }

  login(infoUsuario: Usuario): Observable<Usuario>{
      return this.http.post<Usuario>("http://localhost:8000/login", infoUsuario);
  }

  logout(){
      localStorage.removeItem('sesion');
      this.setUsuario(new Usuario());
  }

  public get usuarioSesionActiva(): Usuario{
      return this.elUsuario.value;
  }

  guardarDatosSesion(datosSesion: any){
      let sesionActual = localStorage.getItem('sesion');
      let data: Usuario = {
          _id: datosSesion._id,
          token: datosSesion.token,
          rol: datosSesion.rol,
          email: datosSesion.email,
          passwd: datosSesion.passwd,
          rolId: datosSesion.rolId

      };

    localStorage.setItem('sesion', JSON.stringify(data));
      this.setUsuario(data);
  }

  sesionExiste():boolean {
      let sesionActual = this.getDatosSesion();
      return (sesionActual) ? true : false;
  }

  crearUsuario(infoUsuario: Usuario){
      return this.http.post("http://localhost:8000/registrar", infoUsuario);
  }

  listarUsers(){
      return this.http.get<Usuario>("http://localhost:8500/usuarios");
  }

  actualizarUsuario(idUsuario: String, idRol:String, cuerpo:any): Observable<Usuario>{

      return this.http.put<Usuario>("http://localhost:8500/updateUsuario/"+idUsuario+"/rolId/"+idRol, cuerpo);
  }

  eliminarUsuario(idUser:String){
      return this.http.delete("http://localhost:8500/borrarUsuario/"+idUser);
  }

}
