import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoProductoPage } from './nuevo-producto';

@NgModule({
  declarations: [
    NuevoProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoProductoPage),
  ],
  exports: [
    NuevoProductoPage
  ]
})
export class NuevoProductoPageModule {}
