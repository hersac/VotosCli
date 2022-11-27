import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CandidatosComponent} from './candidatos/candidatos.component';
import {GestionUsuariosComponent} from './gestion-usuarios/gestion-usuarios.component';
import {HomeComponent} from './home/home.component';
import {PerfilComponent} from './perfil/perfil.component';
import {VotosComponent} from './votos/votos.component';

const routes: Routes = [
    { path: 'votos', component: VotosComponent },
    { path: 'candidatos', component: CandidatosComponent },
    { path: 'home', component: HomeComponent },
    { path: 'gestionUsuarios', component: GestionUsuariosComponent },
    { path: 'perfil', component: PerfilComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }
