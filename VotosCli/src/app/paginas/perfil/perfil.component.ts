
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {SeguridadService} from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

    id:any;
    idRol:any;
    email:any;
    passwd:any;
    rol:any;
    data:any;

    @ViewChild("nuevaContraseña") nuevaContraseña:ElementRef;

    constructor(private miServicioSeguridad: SeguridadService){}

    ngOnInit(): void {
       let usuario = this.miServicioSeguridad.getUsuario();
       usuario.subscribe((data) => {
           this.email = data.email;
           this.passwd = data.passwd;
           this.rol = data.rol;
           this.id = data._id;
           this.idRol = data.rolId;
       });
    }

    desplegar():void{


    }

    actualizar():void{
        this.data = {
            "email":this.email,
            "passwd":this.nuevaContraseña.nativeElement.value
        }

        this.miServicioSeguridad.actualizarUsuario(this.id,this.idRol, this.data);
    }
}
