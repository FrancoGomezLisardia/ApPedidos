import { Component }            from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import {NuevoClientePage}       from '../../pages/nuevo-cliente/nuevo-cliente';


/**
 * Generated class for the ClientesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {
  clientes: FirebaseListObservable<any>;

 
  constructor( public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public fireDatabase: AngularFireDatabase,
       
  ) {
    this.clientes = this.fireDatabase.list('/Clientes');
   
  }

}

