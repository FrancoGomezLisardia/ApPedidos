import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {perfil} from '../../models/perfil'
import {AngularFireDatabase} from 'angularfire2/database';
import { HomePage } from "../home/home";
import { SignInPage } from '../../pages/signin/signin';
import { Firebase_Data } from '../../providers/firebase-data';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
 
  myForm: FormGroup;
  perfil = {} as perfil;
  DatosFirebase:Firebase_Data;
  constructor(
    public formBuilder: FormBuilder,
    private afAuth:AngularFireAuth,
    private afDatabase:AngularFireDatabase, 
    public navCtrl: NavController,
    public menuCtrl: MenuController, 
    public navParams: NavParams) {
      this.DatosFirebase = new Firebase_Data();
      this.myForm = this.createMyForm();
      this.menuCtrl.get().enable(false)
  }

   //Esta funcion cargar el model perfil con los datos del formulario y luego llama a la funcion crearPerfil()
  //--------------------------------------------------------------
   addUser(){
    this.perfil.nombre=this.myForm.value.name;
    this.perfil.apellido=this.myForm.value.lastName;
    this.perfil.fecha_Nacimiento=this.myForm.value.dateBirth;
    this.perfil.sexo=this.myForm.value.gender;
    this.perfil.telefono=this.myForm.value.telefono;
    this.perfil.domicilio=this.myForm.value.domicilio;
this.crearPerfil();
  }
//--------------------------------------------------------------
  //Crea el formulario
  //----------------------------------------------
  private createMyForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      dateBirth: ['', Validators.required],
      domicilio:['', Validators.required],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }
 //----------------------------------------------
 //Crea el perfil del usuario anteriormente registrado
 //--------------------------------------------------------------
crearPerfil (){
  this.afAuth.authState.take(1).subscribe(auth =>{
   this.afDatabase.object(`Perfil/${auth.uid}`).set(this.perfil)
   .then(() => this.navCtrl.setRoot(SignInPage));
  })
}
//--------------------------------------------------------------
}
