import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController} from 'ionic-angular';

import {AngularFireAuth} from 'angularfire2/auth';
import {perfil} from '../../models/perfil'
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { SignInPage }           from '../../pages/signin/signin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 mi_perfil:any;
  user: Observable<firebase.User>;
  perfilDatos: FirebaseObjectObservable <any>;
  productos: FirebaseListObservable<any>
  constructor(private afAuth:AngularFireAuth,
  public afDatabase: AngularFireDatabase,
  private toast:ToastController,
  public navCtrl:NavController,
  public navParams:NavParams,
  public menuCtrl: MenuController,
 
) {
const db = firebase.database();
const alumnos= db.ref().child("Perfil");

  // this.listaPerfil().subscribe( perfil => {this.mi_perfil=perfil});
  
  this.productos = this.afDatabase.list('/Clientes');
    this.menuCtrl.get().enable(true)
    this.user = afAuth.authState;
    
  }

  cerrarSesion(){
    this.afAuth.auth.signOut();
    this.navCtrl.push(SignInPage)
  }
  listaPerfil(){
    return this.perfilDatos=this.afDatabase.object('/Perfil');
      }
ionViewWilload() {
  this.afAuth.authState.take(1).subscribe(data =>{
    if(data && data.email && data.uid){
      this.toast.create({
        message:`Bienvenido a AppPedidos,${data.email}`,
        duration:3000 
      }).present();

      this.perfilDatos = this.afDatabase.object(`Perfil/${data.uid}`)
    }
    else{
      this.toast.create({
        message:'No se han encontrado los detalles de autenticacion.',
        duration:3000
      }).present();
    }
  })
}
  }

