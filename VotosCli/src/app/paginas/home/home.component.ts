import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SeguridadService} from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    constructor(private miServicioSeguridad: SeguridadService, private router: Router){}

    ngOnInit(): void {

        let sesion = this.miServicioSeguridad.sesionExiste();

        if(sesion!=true){
            this.router.navigate(['/'])
        }
    }

    salir():void{
        this.miServicioSeguridad.logout();
        this.router.navigate(['/'])
    }
}
