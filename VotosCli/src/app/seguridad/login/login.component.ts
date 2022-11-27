import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from 'src/app/modelos/usuario.model';
import {SeguridadService} from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    email:string="";
    passwd:string="";

    constructor(private miServicioSeguridad: SeguridadService, private router: Router){ }

    ngOnInit(): void {
        let sesion = this.miServicioSeguridad.sesionExiste();
        if(sesion==true){
            this.router.navigate(['paginas/home'])
        }
    }

    login():void{

        console.log("aqui"+this.email+" contraseña "+this.passwd)
        let elUsuario:Usuario={
            email:this.email,
            passwd:this.passwd
        }

        this.miServicioSeguridad.login(elUsuario).subscribe(
            data=>{
                this.router.navigate(['paginas/home']);
                this.miServicioSeguridad.guardarDatosSesion(data);
            },
            error=>{
                Swal.fire({
                    title: 'Error Login',
                    text: error["error"]["message"],
                    icon: 'error',
                    timer:5000
                });
            }
        );
    }
}
