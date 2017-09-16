import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { usuarios } from "../../models/usuarios";
import { SignInPage }           from '../../pages/signin/signin';
/**
 * Generated class for the RegistrarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
id:null;
usuarios = {id:null, nombre:null,apellido:null,direccion:null,telefono:null};
usuario : usuarios;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  public afDB:AngularFireDatabase) {
    this.usuario = new usuarios();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }
  
  Registrar(){
    this.usuario.id = Date.now();
    this.CrearClientes(this.usuario);
    alert("Usuario Creado");
     this.navCtrl.push(SignInPage);
      }

      public CrearClientes(user){ 
        //this.notes.push(note);
        this.afDB.database.ref('Usuarios/'+user.id).set(user);
        }
        
  }

