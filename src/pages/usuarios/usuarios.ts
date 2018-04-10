import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, 
          AlertController,ModalController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import firebase from 'firebase';
import {DetalleUsuarioPage}         from '../../pages/detalle-usuario/detalle-usuario'
import {RegistrarUsuarioPage}       from '../../pages/registrar-usuario/registrar-usuario';
import {CargaImagenProductoProvider} from "../../providers/carga-imagen-producto/carga-imagen-producto";


/**
 * Generated class for the UsuariosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {
  usuarios: FirebaseListObservable<any>;
  //Variables barra de busqueda
  public usuariosList:Array<any>;
  public loadedUsuariosList:Array<any>;
  public usuariosRef:any;
//------------------------------------------------
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl:ModalController,
              public alertCtrl: AlertController,
              public fireDatabase: AngularFireDatabase,
              private _cap:CargaImagenProductoProvider) {
                this.usuarios = this.fireDatabase.list('/Usuarios');
   
     //-------------------------------------------------------
    
    this.usuariosRef  = firebase.database().ref('Usuarios')
                                .orderByChild('estado')
                                .equalTo(1);//Referencia a los productos de estado 1
     //  .orderByChild('estado')
      //   .equalTo(1);//Referencia a los productos de estado 1
    this.usuariosRef.on('value', usuariosList => {
    let usuarios = [];
    usuariosList.forEach( usuario => {
    usuarios.push(usuario.val());
    return false;
    });

    this.usuariosList = usuarios;
    this.loadedUsuariosList = usuarios;

    });
      //-------------------------------------------------------
    }

    initializeItems2(): void {
      this.usuariosList = this.loadedUsuariosList;
      console.log(this.usuariosList);
    }
  //---------------------------------------------------
    getItems2(searchbar) {
      // Reset items back to all of the items
      this.initializeItems2();
    
      // set q to the value of the searchbar
      var q = searchbar.srcElement.value;
      
      // if the value is an empty string don't filter the items
      if (!q) {
        return;
      }
    
      this.usuariosList = this.usuariosList.filter((v) => {
        if(v.apellido && q ) {
          if ((v.apellido.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
            return true;
          }
          return false;
        }
      });
    
      console.log(q, this.usuariosList.length);
    
    }
    //---------------------------------------------------
    detalleUsuario(usuario){
      let modal =this.modalCtrl.create(DetalleUsuarioPage,{'usuario':usuario});
      modal.present();
    }
    nuevoUsuario(){
      let modal =this.modalCtrl.create(RegistrarUsuarioPage);
      modal.present();
    }
  }

