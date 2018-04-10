import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,LoadingController } from 'ionic-angular';

import { CargaImagenProductoProvider } from '../../providers/carga-imagen-producto/carga-imagen-producto';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import {OrdenesDetallePage} from "../../pages/ordenes-detalle/ordenes-detalle"
/**
 * Generated class for the OrdenesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
pedidos_DB:FirebaseListObservable <any []>;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cip:CargaImagenProductoProvider,
              public loadingCtrl: LoadingController,
              public modalCtrl:ModalController,              
              public afDB:AngularFireDatabase) {
                let loading = this.loadingCtrl.create({
                  content: 'Cargando Productos. Por favor, espere...'
              });
              loading.present();
                this.pedidos_DB=this.afDB.list('/pedidos');
                loading.dismiss()
  }

  ionViewWilEnter() {
    console.log('Cargando Ordenes');
    this.cip.cargar_ordenes();
  }
  irAPaginaOrdenesDetalle(item){
    //this.navCtrl.setRoot("OrdenesDetallePage",{"orden":item});
    let modal=this.modalCtrl.create(OrdenesDetallePage,{"orden":item})
    modal.present()
  }
}
