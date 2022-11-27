import {DOCUMENT} from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {PaginasService} from 'src/app/servicios/paginas.service';

@Component({
  selector: 'app-votos',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.css']
})
export class VotosComponent implements OnInit{

    candidatos:any;
    @ViewChild("infoIdentif") infoVotante:ElementRef;
    

    constructor(private servicioPaginas: PaginasService){ 
    }

    ngOnInit(): void { 
        this.servicioPaginas.mostrarCandidatos().subscribe((data) =>{
           this.candidatos=data
       });
    }

    votar():void{

        let infoMesa = {"inscNumber": "1"};
        let identif = this.infoVotante.nativeElement.value;
        console.log("dentro del componente \n" + identif)
        this.servicioPaginas.votar(identif, infoMesa)
    }
}


