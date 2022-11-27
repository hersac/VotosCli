import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrarComponent,
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule
  ]
})
export class SeguridadModule { }
