import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {SeguridadService} from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
    @ViewChild('menuContainer') menuContainer:ElementRef;
    @ViewChild('configElect') configElect:ElementRef;

    cont:boolean=false;
    cont2:boolean=false;

    constructor(private miServicioSeguridad: SeguridadService, private router: Router, private renderer: Renderer2){}

    salir():void{
        this.router.navigate(['login'])
        this.miServicioSeguridad.logout();
    }

    desplegar(){
        if(this.cont==false){
            this.renderer.removeClass(this.menuContainer.nativeElement, "content");
            this.renderer.addClass(this.menuContainer.nativeElement, "content2")
            this.cont=true;
        }else if(this.cont==true){
            this.renderer.removeClass(this.menuContainer.nativeElement, "content2")
            this.renderer.addClass(this.menuContainer.nativeElement, "content")
            this.cont=false;
        }

    }

    desplegarConfig(){

        if(this.cont2==false){
            this.renderer.removeClass(this.configElect.nativeElement, "configElect");
            this.cont2=true;
        }else if(this.cont2==true){
            this.renderer.addClass(this.configElect.nativeElement, "configElect");
            this.cont2=false;
        }
    }
}
