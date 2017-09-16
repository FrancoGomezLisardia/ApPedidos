import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {perfil} from '../../models/perfil'
import {AngularFireDatabase} from 'angularfire2/database';
import { HomePage } from "../home/home";
import { SignInPage } from '../../pages/signin/signin';
/**
 * Generated class for the PerfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

perfil = {} as perfil;
  constructor(
    private afAuth:AngularFireAuth,
    private afDatabase:AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }
crearPerfil (){

  this.afAuth.authState.take(1).subscribe(auth =>{
   this.afDatabase.object(`Perfil/${auth.uid}`).set(this.perfil)
   .then(() => this.navCtrl.setRoot(SignInPage));
  })
}
}
