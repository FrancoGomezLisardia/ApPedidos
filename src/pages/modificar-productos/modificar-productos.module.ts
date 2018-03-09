import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificarProductosPage } from './modificar-productos';

@NgModule({
  declarations: [
    ModificarProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificarProductosPage),
  ],
  exports: [
    ModificarProductosPage
  ]
})
export class ModificarProductosPageModule {}
