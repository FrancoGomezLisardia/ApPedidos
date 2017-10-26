import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Clientes }             from "../../models/clientes";
import { usuarios } from "../../models/usuarios";
/**
 * Generated class for the NuevoClientePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nuevo-cliente',
  templateUrl: 'nuevo-cliente.html',
})
export class NuevoClientePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoClientePage');
  }

}
