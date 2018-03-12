import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,LoadingController,AlertController,Platform } from 'ionic-angular';
import * as firebase from 'firebase/app';

import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { UserModel } from '../../models/user-model';
import {Storage}                    from "@ionic/storage";
import {CargaImagenProductoProvider} from "../../providers/carga-imagen-producto/carga-imagen-producto"
import { ProductosPage }        from '../../pages/productos/productos';


/**
 * Generated class for the InicioSesionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inicio-sesion',
  templateUrl: 'inicio-sesion.html',
})
export class InicioSesionPage {
  userModel: UserModel;
  listaDeUsuarios:any[]= [];
  public usuariosRef:firebase.database.Reference;
  constructor(public loadingCtrl: LoadingController,
              private cip:CargaImagenProductoProvider,
              public navCtrl: NavController,
              private menuCtrl:MenuController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private afDB:AngularFireDatabase,
              private platform:Platform,
              private storage:Storage) {
                let loading = this.loadingCtrl.create({
                  content: 'Cargando Aplicacion. Por favor, espere...'
              });
              loading.present();
  this.userModel = new UserModel();
  this.menuCtrl.get().enable(false);//Desactiva menu deslizable

  this.usuariosRef = firebase.database().ref('/Usuarios');//Crea una referencia al Nodo Usuarios
  this.usuariosRef.on('value', listaDeUsuarios => {
    let usuarios = [];
    listaDeUsuarios.forEach( usuario => {
    usuarios.push(usuario.val());
    return false;
     });
     this.listaDeUsuarios = usuarios ;
  console.log("Usuarios Registrados:",this.listaDeUsuarios);
 });//Crea un arreglo con los elementos del nodo Usuarios

 loading.dismiss();
  }

guardar_storage(p){
    //Condicion para saber si la app esta corriendo en dispositivo o pc
    if(this.platform.is("cordova")){
    //dispositivo
  this.storage.set("usuarioLogeado",p)
    }else{
  //Computadora
  localStorage.setItem("usuarioLogeado",JSON.stringify(p));
}
}  
crear_arregglo_usuarios(){

}
  Iniciar_Sesion() {
  
    for (let index = 0; index < this.listaDeUsuarios.length; index++) {
    
         const element =  this.listaDeUsuarios[index];
         if (element.contrasena==this.userModel.password && element.correo==this.userModel.email ) {
            this.guardar_storage(element);
            this.cip.usuario_actual.push(element)
            console.log("ID Usuario Actual:",this.cip.usuario_actual)
            this.navCtrl.setRoot(ProductosPage,{'usuarioLogeado':element});
            return;
         } 
       }
   this.alertCtrl.create({
    title:"Error",
    subTitle:'Usuario o Contraseña invalidos. Por favor intente nuevamente.',
    buttons:["Aceptar"]
   }).present();
   console.log('--------------------------------');
   return;
    
  }

}
