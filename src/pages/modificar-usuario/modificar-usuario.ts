import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,
         ToastController,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';

/**
 * Generated class for the ModificarUsuarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modificar-usuario',
  templateUrl: 'modificar-usuario.html',
})
export class ModificarUsuarioPage {
  
  usuario_modificar={
    estado:1,
    apellido:null,
    contrasena:null,
    correo:null,
    dni:null,
    domicilio: null,
    fecha_Nacimiento: null,
    id: null,
    nombre: null,
    sexo: null,
    telefono: null,
    tipo_usuario:2
  }
  id:null;
  usuario:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public alertCtrl:AlertController,
    public afDB:AngularFireDatabase,
    public toastCtrl:ToastController) {
    this.usuario=this.navParams.get("usuario");
    this.id=this.usuario.id
    this.getUsuario(this.id)
         .subscribe(cliente =>{
        this.usuario_modificar= cliente;

        });
  }

  getUsuario(id) {
    return this.afDB.object('Usuarios/'+id);
  }

  modificar(){
    //Hace una eliminacion logica de los productos
   //modificando su estado a 0
   let confirmar = this.alertCtrl.create({
     title: 'Modificar',
     message: '¿Confirma Modificacion?',
     buttons: [
       {
         text: 'Cancelar',
         handler: () => {
           
           console.log('Presiono Cancelar');
         }
       },
       {
         text: 'Aceptar',
         handler: () => {
          
           firebase.database().ref('Usuarios/' + this.id).set({

            estado:1,
            apellido:this.usuario_modificar.apellido,
            contrasena:this.usuario_modificar.contrasena,
            correo:this.usuario_modificar.correo,
            dni:this.usuario_modificar.dni,
            domicilio:this.usuario_modificar.domicilio,
            fecha_Nacimiento: this.usuario_modificar.fecha_Nacimiento,
            id: this.id,
            nombre: this.usuario_modificar.nombre,
            sexo: this.usuario_modificar.sexo,
            telefono: this.usuario_modificar.telefono,
            tipo_usuario:2
           
   });
   let toast = this.toastCtrl.create({
    message: 'Usuario Modificado',
    duration: 3000
  });
  toast.present();
  this.viewCtrl.dismiss()
         }
       }
     ]
   });
   confirmar.present()
   
 }

}
