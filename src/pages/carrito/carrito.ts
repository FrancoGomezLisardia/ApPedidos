import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import {CargaImagenProductoProvider} from "../../providers/carga-imagen-producto/carga-imagen-producto"
import { ClientesPage } from '../clientes/clientes';
/**
 * Generated class for the CarritoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  constructor(public navCtrl: NavController, 
              public modalCtrl:ModalController,
              public navParams: NavParams,
              private cip:CargaImagenProductoProvider,
              private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarritoPage');
  }
  cerrarModal() {
    this.viewCtrl.dismiss();
   }
   buscarCliente(){
    let modal =this.modalCtrl.create(ClientesPage);
    modal.present();
   }
   realizar_pedido(){
    this.cip.realizar_pedido()
    this.viewCtrl.dismiss()
   }
}
