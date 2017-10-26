import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {perfil} from '../../models/perfil'
import {AngularFireDatabase} from 'angularfire2/database';
import { HomePage } from "../home/home";
import { SignInPage } from '../../pages/signin/signin';
import { Firebase_Data } from '../../providers/firebase-data';
import 'rxjs/add/operator/debounceTime';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

   //Esta funcion carga el model perfil con los datos del formulario y luego llama a la funcion crearPerfil()
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
 // ----------------------------------------------
  private createMyForm(){
    //this.my = new FormGroup({
    return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      DNI:['', Validators.compose([
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8),
     ])],
      //email: ['', Validators.compose([
        //    Validators.required,
          //  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      dateBirth: ['', Validators.required],
      domicilio:['', Validators.required],
      telefono: ['', Validators.required],
     // password: ['', Validators.required],
      gender: ['', Validators.required],
    });
   
  }
  // private createMyForm(){
  // this.myForm = new FormGroup({
  //   dni: new FormControl('', Validators.compose([
  //     Validators.maxLength(8),
  //     Validators.minLength(8),
  //     //Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
  //     Validators.required
  //   ])),
  //  })
  //  this.myForm.valueChanges
  //  .debounceTime(400)
  // .subscribe(data => this.onValueChanged(data));
  // }
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

formErrors = {
  'DNI': [],
  // 'email': [],
  // 'password': [],
  // 'confirmPassword': []
};

validationMessages = {
  'DNI': {
    'required':      'dni is required.',
    // 'minlength':     'Username must be at least 5 characters long.',
    // 'maxlength':     'Username cannot be more than 25 characters long.',
    // 'pattern':       'Your username must contain only numbers and letters.',
    // 'validUsername': 'Your username has already been taken.'
  },
  'email': {
    'required':      'Email is required',
    'pattern':       'Enter a valid email.'
  },
  'password': {
    'required':      'Password is required',
    'minlength':     'Password must be at least 5 characters long.',
    'pattern':       'Your password must contain at least one uppercase, one lowercase, and one number.'
  },
  'confirmPassword':{
    'required':      'Confirm password is required',
    'minlength':     'Confirm password must be at least 5 characters long.',
    'pattern':       'Your password must contain at least one uppercase, one lowercase, and one number.',
    'validateEqual': 'Password mismatch'
  }
};



onValueChanged(data?: any) {
    if (!this.myForm) { return; }
    const form = this.myForm;
    for (const field in this.formErrors) {
      // Limpiamos los mensajes anteriores
      this.formErrors[field] = [];
      this.myForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
}
}
