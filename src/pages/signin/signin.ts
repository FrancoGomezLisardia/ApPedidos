import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

import { UserModel } from '../../models/user-model';

import { SignUpPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { PerfilPage } from '../perfil/perfil';
import { AngularFireDatabase,FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase/app";
import * as firebase from 'firebase/app';

@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SignInPage {
    userModel: UserModel;

user = firebase.auth().currentUser;  
 perfil:FirebaseListObservable<any[]>;
    constructor(public menuCtrl: MenuController,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public authService: AuthService,
        private afAuth:AngularFireAuth,
        private afDatabase:AngularFireDatabase
        ) {
         this.perfil = this.afDatabase.list('/Perfil');
         const queryObservable = afDatabase.list('/Perfil', {
            query: {
              orderByChild: 'nombre',
              equalTo: 'asda' 
            }
          });
          //alert(queryObservable);
       
         console.log(queryObservable);


        this.userModel = new UserModel();
       this.menuCtrl.get().enable(false);
        }
  
        
   
    signIn() {
        let loading = this.loadingCtrl.create({
            content: 'Iniciando sesión. Por favor, espere...'
        });
        loading.present();

        this.authService.signInWithEmailAndPassword(this.userModel).then(result => {
            loading.dismiss();
          if (""){}
           this.navCtrl.setRoot(HomePage);
            
         
          
        }).catch(error => {
            loading.dismiss();

            console.log(error);
            this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
        });
    }

    signUp() {
        this.navCtrl.push(SignUpPage);
    }

    alert(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

}