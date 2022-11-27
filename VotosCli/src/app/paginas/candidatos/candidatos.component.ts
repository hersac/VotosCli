import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PaginasService} from 'src/app/servicios/paginas.service';
import {SeguridadService} from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css']
})
export class CandidatosComponent implements OnInit{

   candidatos:any;

    constructor(private servicioPaginas: PaginasService, private router: Router, private miServicioSeguridad: SeguridadService){ }

    ngOnInit(): void { 
       this.servicioPaginas.mostrarCandidatos().subscribe((data) =>{
           this.candidatos=data
       });
       let sesion = this.miServicioSeguridad.sesionExiste();
       if(sesion!=true){
           this.router.navigate(['/'])
       }

    }

   mostrarCandidatos(): void {

   }
}
