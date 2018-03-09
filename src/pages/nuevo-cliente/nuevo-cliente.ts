import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              public formBuilder: FormBuilder) {
    this.myForm = this.createMyForm();
    this.clientes = this.fireDatabase.list('/Clientes');
  }

   //Esta funcion cargar el model clientes con los datos del formulario y luego llama a la funcion crearPerfil()
  //--------------------------------------------------------------
  addCliente(){
    // this.model_clientes.nombre=this.myForm.value.name;
    // this.model_clientes.dni=this.myForm.value.DNI;
    // this.model_clientes.apellido=this.myForm.value.lastName;
    // this.model_clientes.fecha_nacimiento=this.myForm.value.dateBirth;
    // this.model_clientes.Direccion=this.myForm.value.domicilio
    // this.model_clientes.Telefono=this.myForm.value.telefono
    // this.model_clientes.email=this.myForm.value.email;
    // this.model_clientes.fecha_nacimiento=this.myForm.value.dateBirth;
    
    
this.crearClientes();
  }
  crearClientes(){
    // this.model_clientes.id = Date.now()
    // this.fireDatabase.database.ref('Clientes/'+this.model_clientes.id).set(this.model_clientes);
    // this.showAlert();
    // this.navCtrl.push(AdiminClientesPage);
  }
  showAlert() {
    // let alert = this.alertCtrl.create({
    //   title: 'Nuevo Cliente!',
    //   subTitle: this.model_clientes.nombre+" "+this.model_clientes.apellido+" ha sido agregado",
    //   buttons: ['OK']
    }
    // alert.present();
  
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
    email: ['', Validators.compose([
          Validators.required,
         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    dateBirth: ['', Validators.required],
    domicilio:['', Validators.required],
    telefono: ['', Validators.required],
   
  });

}

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
        
        
        
        // onValueChanged(data?: any) {
        //     if (!this.myForm) { return; }
        //     const form = this.myForm;
        //     for (const field in this.formErrors) {
        //       // Limpiamos los mensajes anteriores
        //       this.formErrors[field] = [];
        //       this.myForm[field] = '';
        //       const control = form.get(field);
        //       if (control && control.dirty && !control.valid) {
        //         const messages = this.validationMessages[field];
        //         for (const key in control.errors) {
        //           this.formErrors[field].push(messages[key]);
        //         }
        //       }
        //     }
        // }
}
