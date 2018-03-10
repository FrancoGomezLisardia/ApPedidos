import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";

/**
 * Generated class for the NuevoClientePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nuevo-cliente',
  templateUrl: 'nuevo-cliente.html',
})
export class NuevoClientePage {
  clientes: FirebaseListObservable<any>;
  myForm: FormGroup;
  constructor(public navCtrl: NavController,
              public fireDatabase: AngularFireDatabase,
              public navParams: NavParams,
              public toastCtrl:ToastController,
              public viewCtrl:ViewController,
              public formBuilder: FormBuilder) {
    this.myForm = this.createMyForm();
    
  }
  cerrarModal(){
    this.viewCtrl.dismiss()
  }

  

  Registrar(){
    let id_cliente=new Date().valueOf().toString();
    let Nuevo_Cliente : Interface_Cliente = {
      nombre:this.myForm.value.name,
      apellido:this.myForm.value.lastName,
      dni:this.myForm.value.DNI,
      id:id_cliente,
      Telefono:this.myForm.value.telefono,
      domicilio:this.myForm.value.domicilio,
      fecha_Nacimiento:this.myForm.value.dateBirth,
      sexo:this.myForm.value.gender,
      estado:1,
      email:this.myForm.value.email,
     
    }
    this.fireDatabase.object(`/Clientes/${ id_cliente }`).update(Nuevo_Cliente);
    let toast = this.toastCtrl.create({
      message: 'Cliente Registrado',
      duration: 3000
    });
    toast.present();
    this.viewCtrl.dismiss()
    
  }
  
//------------------------------------------------
  //Crea el formulario
 // ----------------------------------------------
 private createMyForm(){
 
  return this.formBuilder.group({
    name: ['',Validators.compose([
              Validators.maxLength(30), 
              Validators.pattern('[a-zA-Z ]*'),
              Validators.required])],
    lastName: ['',Validators.compose([
                  Validators.maxLength(30), 
                  Validators.pattern('[a-zA-Z ]*'),
                  Validators.required])],
    DNI:['', Validators.compose([
             Validators.required,
             Validators.maxLength(8),
             Validators.minLength(8),
   ])],
    email: ['', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    dateBirth: ['', Validators.required],
    domicilio:['', Validators.required],
    telefono: ['', Validators.required],
    gender: ['', Validators.required],
   
  });

}

}
interface Interface_Cliente{
  nombre:string;
  apellido:string;
  dni:number;
  id:string;
  Telefono:number;
  domicilio:string;
  fecha_Nacimiento:string;
  sexo:string;
  estado:number
  email:string;
}