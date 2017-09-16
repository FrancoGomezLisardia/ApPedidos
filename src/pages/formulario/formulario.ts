import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { formulario } from "../../models/formulario";

import { Firebase_Data } from '../../providers/firebase-data';

/**
 * Generated class for the FormularioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
  datosFomr:FirebaseListObservable<any>;
  myForm: FormGroup;
  DatosFirebase:Firebase_Data;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public fireDatabase: AngularFireDatabase) {
               this.DatosFirebase = new Firebase_Data();
                this.myForm = this.createMyForm();
  this.datosFomr = this.fireDatabase.list('/datosForm');
  }
  // saveData(){
  //   console.log(this.myForm.value);
  //   this.datosFomr.push({
  //    name, lastName,email,dateBirth
  //  });
  //   alert("guardado")
  // }
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
  // saveData( name,lastName) {
    
  //   return firebase.database().ref('songs')
  //   .push({ name: "name",apellido:lastName });
      
  // }
  private createMyForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateBirth: ['', Validators.required],
      passwordRetry: this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required]
      }),
      gender: ['', Validators.required],
    });
  }

}
