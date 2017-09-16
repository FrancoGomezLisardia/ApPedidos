import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

import { UserModel } from '../../models/user-model';

import { SignInPage } from '../signin/signin';
import { usuarios } from "../../models/usuarios";
import { AngularFireDatabase } from "angularfire2/database";
import { PerfilPage } from '../perfil/perfil';
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignUpPage {
    userModel: UserModel;
    id:null;
    usuarios = {id:null, nombre:null,apellido:null,direccion:null,telefono:null};
    usuario : usuarios;
    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public authService: AuthService,
        public afDB:AngularFireDatabase
    ) {
        this.userModel = new UserModel();
        this.usuario = new usuarios();
    }

    signUp() {
        let loading = this.loadingCtrl.create({
            content: 'Creando cuenta. Por favor, espere...'
        });
        loading.present();

        this.authService.createUserWithEmailAndPassword(this.userModel).then(result => {
            loading.dismiss();

            //Datos usuario
            //this.Registrar();
            //-----------------------
            this.navCtrl.push(PerfilPage);
        }).catch(error => {
            loading.dismiss();

            console.log(error);
            this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
        });
    }

    alert(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
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