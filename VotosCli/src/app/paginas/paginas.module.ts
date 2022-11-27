import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { VotosComponent } from './votos/votos.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    VotosComponent,
    CandidatosComponent,
    HomeComponent,
    MenuComponent,
    GestionUsuariosComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    FormsModule
  ]
})
export class PaginasModule { }
