import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import {SeguridadService} from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit{

    data:any;
    @ViewChild("idUser") idUser: ElementRef;
    @ViewChild("rolData") idRol: ElementRef;
    @ViewChild("passwordData") passwdUser: ElementRef;
    @ViewChild("cuento") indic:ElementRef;
    @ViewChildren("emailUser") emailUsers: QueryList<ElementRef>;
    @ViewChild("formulario") formulario:ElementRef;
    @ViewChild("dataUsers") dataUsers:ElementRef;
    cont:boolean=false;

    constructor(private miServicioSeguridad: SeguridadService, private renderer:Renderer2){}

    ngOnInit(): void {
        this.miServicioSeguridad.listarUsers().subscribe(
            (data)=>{
                this.data=data
            }
        );
    }


    desplegarOpciones(){
        if(this.cont==false){ 
            this.renderer.removeClass(this.dataUsers.nativeElement, "dataUsers")
            this.renderer.addClass(this.dataUsers.nativeElement, "dataUsers2")
            this.renderer.removeClass(this.formulario.nativeElement, "formulario")
            this.renderer.addClass(this.formulario.nativeElement, "formulario2")
            this.cont=true;
        } 
    }



    guardar(): void{
        let idUsuario = this.idUser.nativeElement.value;
        let idRol = this.idRol.nativeElement.value;
        let passwd = this.passwdUser.nativeElement.value;


        if(this.cont==true){
            this.renderer.removeClass(this.dataUsers.nativeElement, "dataUsers2")
            this.renderer.addClass(this.dataUsers.nativeElement, "dataUsers")
            this.renderer.removeClass(this.formulario.nativeElement, "formulario2")
            this.renderer.addClass(this.formulario.nativeElement, "formulario")
            this.cont=false;
        }

//        this.miServicioSeguridad.actualizarUsuario(idUsuario, idRol, passwd)
    }

    eliminar():void{
        let idUsuario = this.idUser.nativeElement.textContent;
        console.log(idUsuario)
        //this.miServicioSeguridad.eliminarUsuario(idUsuario);
    }

}
