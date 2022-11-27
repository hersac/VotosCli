import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from 'src/app/modelos/usuario.model';
import {SeguridadService} from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit{
    email:string="";
    passwd:string="";
    passwdRepit:string="";

    constructor(private miServicioSeguridad: SeguridadService, private router: Router ){ }

    ngOnInit(): void {
        
    }

    crearUsuario():void{
        console.log("aqui"+this.email+"Y contraseña"+this.passwd)
        let elUsuario: Usuario={
            email:this.email,
            passwd: this.passwd
        }

        this.miServicioSeguridad.crearUsuario(elUsuario).subscribe(
            data=>{
                this.router.navigate(['seguridad']);
                this.miServicioSeguridad.guardarDatosSesion(data);
            },
            error=>{
                Swal.fire({title: 'Error create',
                          text: error["error"]["message"],
                          icon: 'error',
                          timer:5000
                });
            }
        );
    }
    
}
