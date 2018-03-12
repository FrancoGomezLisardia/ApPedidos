import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,
  AlertController,ToastController,ModalController } from 'ionic-angular';
import firebase from 'firebase';
import {ModificarUsuarioPage} from "../../pages/modificar-usuario/modificar-usuario"

/**
 * Generated class for the DetalleUsuarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detalle-usuario',
  templateUrl: 'detalle-usuario.html',
})
export class DetalleUsuarioPage {
usuario:any;
  constructor(public navCtrl: NavController,
    public toastCtrl:ToastController, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public alertCtrl:AlertController,
    public modalCtrl:ModalController) {
      this.usuario=this.navParams.get("usuario")
      console.log("USUARIO:",this.usuario)

    }
  
    
    cerrarModal(){
      this.viewCtrl.dismiss()
    }
    modificar(){
      let modal =this.modalCtrl.create(ModificarUsuarioPage,{"cliente":this.usuario});
      modal.present();
    }
    eliminar(parametro){
      //Hace una eliminacion logica de los productos
     //modificando su estado a 0
     let confirmar = this.alertCtrl.create({
       title: 'Eliminar',
       message: '¿Desea eliminar este usuario?',
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
            
             firebase.database().ref('Usuarios/' + this.usuario.id).set({
             estado:0,
             nombre:this.usuario.nombre,
             apellido:this.usuario.apellido,
             dni:this.usuario.dni,
             id:this.usuario.id,
             telefono:this.usuario.telefono,
             domicilio:this.usuario.domicilio,
             fecha_Nacimiento:this.usuario.fecha_Nacimiento,
             sexo:this.usuario.sexo,
            correo:this.usuario.correo
     });
     let toast = this.toastCtrl.create({
      message: 'Usuario Eliminado',
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
