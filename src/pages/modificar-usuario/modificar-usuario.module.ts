import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificarUsuarioPage } from './modificar-usuario';

@NgModule({
  declarations: [
    ModificarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificarUsuarioPage),
  ],
  exports: [
    ModificarUsuarioPage
  ]
})
export class ModificarUsuarioPageModule {}
