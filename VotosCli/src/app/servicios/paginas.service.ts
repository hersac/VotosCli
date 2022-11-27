import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Candidato} from '../modelos/candidato.model';
import {Mesa} from '../modelos/mesa.model';
import {Usuario} from '../modelos/usuario.model';
import {Voto} from '../modelos/voto.model';
import {SeguridadService} from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PaginasService {

    url:string="http://localhost:8600";

    constructor(private http: HttpClient, private router: Router, private miServicioSeguridad: SeguridadService) { }



    mostrarVotos(): Observable<Voto>{
        return this.http.get<Voto>(this.url+"/data/votos");
    }

    mostrarCandidatos(): Observable<Candidato>{
        return this.http.get<any>(this.url+"/data/candidatos");
    }

    votar(identifCand: String, infoMesa: Mesa){

      let mesaId;

      console.log("dentro del servicio")
      console.log(identifCand)
      console.log(infoMesa)
      console.log("mesaId="+mesaId)
      this.http.post<any>(this.url+"/data/addMesa/candidato"+identifCand, infoMesa)
      return this.http.post(this.url+"/data/addVoto/mesa/"+mesaId+"/candidato/"+identifCand, infoMesa);
    }

}
