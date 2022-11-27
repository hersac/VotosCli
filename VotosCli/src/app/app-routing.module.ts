import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
        {
            path: 'seguridad',
            loadChildren: () => import('./seguridad/seguridad.module')
            .then(m => m.SeguridadModule),
        },
        {
            path: 'paginas',
            loadChildren: () => import('./paginas/paginas.module')
            .then(p => p.PaginasModule)
        }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
