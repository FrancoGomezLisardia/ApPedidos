import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

import { UserModel } from '../../models/user-model';

import { SignInPage } from '../signin/signin';
import { usuarios } from "../../models/usuarios";
import { AngularFireDatabase } from "angularfire2/database";
import { PerfilPage } from '../perfil/perfil';
import { Firebase_Data } from '../../providers/firebase-data';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignUpPage {
    userModel: UserModel;
    id:null;
    usuarios = {id:null, nombre:null,apellido:null,direccion:null,telefono:null};
    usuario : usuarios;
    myForm: FormGroup;
    DatosFirebase:Firebase_Data;
    constructor(
        public formBuilder: FormBuilder,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public authService: AuthService,
        public afDB:AngularFireDatabase,
        public menuCtrl: MenuController
    ) {
        this.userModel = new UserModel();
        this.usuario = new usuarios();
        this.DatosFirebase = new Firebase_Data();
        this.myForm = this.createMyForm();
       // this.menuCtrl.get().enable(false)
    }
    addUser(){
        if (!this.myForm.valid){
          console.log("Nice try!");
        } else {
          this.DatosFirebase.saveData(this.myForm.value.name, this.myForm.value.lastName).then( () => {
              this.myForm.reset();
            });
            alert("vamo la puta madre");
        }
      
      }
      private createMyForm(){
        return this.formBuilder.group({
          name: ['', Validators.required],
          lastName: ['', Validators.required],
          //email: ['', Validators.required],
          dateBirth: ['', Validators.required],
         
           // password: ['', Validators.required],
            //passwordConfirmation: ['', Validators.required]
        
          //gender: ['', Validators.required],
        });
      }
    signUp() {
        let loading = this.loadingCtrl.create({
            content: 'Creando cuenta. Por favor, espere...'
        });
        loading.present();
// this.userModel.email=this.myForm.value.email
// alert(this.userModel.password=this.myForm.value.password)
// this.userModel.password=this.myForm.value.password
        this.authService.createUserWithEmailAndPassword(this.userModel).then(result => {
            

           //this. addUser();
            //Datos usuario
            //this.Registrar();
            loading.dismiss();
            //-----------------------
            this.navCtrl.push(PerfilPage);
        }).catch(error => {
            loading.dismiss();

            console.log(error);
            this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente ingresando un correo diferente.');
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