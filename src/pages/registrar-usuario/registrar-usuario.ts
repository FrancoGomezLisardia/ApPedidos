import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import firebase from 'firebase';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
/**
 * Generated class for the RegistrarUsuarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registrar-usuario',
  templateUrl: 'registrar-usuario.html',
})
export class RegistrarUsuarioPage {
  myForm: FormGroup;
  lista:any[]=[];
  verificar:boolean=false;
  //DatosFirebase:Firebase_Data;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public viewCtrl:ViewController,
              public toastCtrl:ToastController,
              public alertCtrl:AlertController,
              private afDB: AngularFireDatabase) {
                this.myForm = this.createMyForm();
  }


 //Esta funcion carga el model perfil con los datos del formulario
   //y luego llama a la funcion crearPerfil()
  //--------------------------------------------------------------
  Registrar(){
    let id_Usuario=new Date().valueOf().toString();
    let Nuevo_Usuario : Interface_Usuario = {
      nombre:this.myForm.value.name,
      apellido:this.myForm.value.lastName,
      dni:this.myForm.value.DNI,
      id:id_Usuario,
      telefono:this.myForm.value.telefono,
      domicilio:this.myForm.value.domicilio,
      fecha_Nacimiento:this.myForm.value.dateBirth,
      sexo:this.myForm.value.gender,
      tipo_usuario:2,
      correo:this.myForm.value.email,
      contrasena:this.myForm.value.password,
      estado:1
    }
    this.verificar_correo()
    if (this.lista.length=0) {
      this.afDB.object(`/Usuarios/${ id_Usuario }`).update(Nuevo_Usuario);
      let toast = this.toastCtrl.create({
     message: 'Proveedor Registrado',
     duration: 3000
   });
   toast.present();
     this.viewCtrl.dismiss();
    }else{
      let confirmar = this.alertCtrl.create({
        title: 'Aviso',
        message: 'El correo ingresado ya existe',
        buttons: [
          {
           
            text: 'Aceptar',
            handler: () => {
                         }
          }
        ]
      });
      confirmar.present()
    }
   
  
  }
verificar_correo(){
  let ref;

  
  ref=firebase.database().ref('Usuarios')
                        .orderByChild("correo")
                       .equalTo(this.myForm.value.email)
    ref.on('value', lista => {
    let correos = [];
    lista.forEach( correo => {
      
    correos.push(correo.val());
    console.log("valor",correo.val())
    return false;
    });
    this.lista =correos;
    
    });
    console.log("LISTA:",this.lista)
   
}
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
      password: ['',Validators.compose([
                    Validators.required,
                    Validators.maxLength(6),
])],
      gender: ['', Validators.required],
    });
   
  }
  cerrarModal() {
    this.viewCtrl.dismiss();
   }
}
 interface Interface_Usuario{
  nombre:string;
  apellido:string;
  dni:number;
  id:string;
  telefono:number;
  domicilio:string;
  fecha_Nacimiento:string;
  sexo:string;
  tipo_usuario:number
  correo:string;
  contrasena:number
  estado:number
}
