import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdiminClientesPage } from './adimin-clientes';

@NgModule({
  declarations: [
    AdiminClientesPage,
  ],
  imports: [
    IonicPageModule.forChild(AdiminClientesPage),
  ],
  exports: [
    AdiminClientesPage
  ]
})
export class AdiminClientesPageModule {}
