import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioSesionPage } from './inicio-sesion';

@NgModule({
  declarations: [
    InicioSesionPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioSesionPage),
  ],
  exports: [
    InicioSesionPage
  ]
})
export class InicioSesionPageModule {}
