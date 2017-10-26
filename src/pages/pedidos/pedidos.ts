import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";

/**
 * Generated class for the PedidosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {
pedidos: FirebaseListObservable<any>;
clientes: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public fireDatabase: AngularFireDatabase,) {
    this.pedidos=fireDatabase.list('/PedidosSinConfirmar');
    this.clientes=fireDatabase.list('/Clientes');
   
  
  }
 
 
}