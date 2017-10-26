import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientesPage }         from '../../pages/clientes/clientes';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import {DetallePage}            from '../../pages/detalle/detalle';
/**
/**
 * Generated class for the AdiminClientesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-adimin-clientes',
  templateUrl: 'adimin-clientes.html',
})
export class AdiminClientesPage {
  clientes: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public fireDatabase: AngularFireDatabase) {
      
    this.clientes = this.fireDatabase.list('/Clientes');
  }
  public goToNuevoCliente(id){
    this.navCtrl.push(DetallePage,{id:id});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdiminClientesPage');
  }
  AgregarCliente(){
    this.navCtrl.push(ClientesPage);
  }
}
