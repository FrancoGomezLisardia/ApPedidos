import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendedoresPage } from './vendedores';

@NgModule({
  declarations: [
    VendedoresPage,
  ],
  imports: [
    IonicPageModule.forChild(VendedoresPage),
  ],
  exports: [
    VendedoresPage
  ]
})
export class VendedoresPageModule {}
