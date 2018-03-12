import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,
        AlertController,ToastController,ModalController } from 'ionic-angular';
import firebase from 'firebase';
import {ModificarClientePage} from "../../pages/modificar-cliente/modificar-cliente"
/**
 * Generated class for the DetalleClientePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detalle-cliente',
  templateUrl: 'detalle-cliente.html',
})
export class DetalleClientePage {
cliente:any;
  constructor(public navCtrl: NavController,
              public toastCtrl:ToastController, 
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public alertCtrl:AlertController,
              public modalCtrl:ModalController) {
this.cliente=this.navParams.get("cliente")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleClientePage');
  }
  cerrarModal(){
    this.viewCtrl.dismiss()
  }
  modificar(){
    let modal =this.modalCtrl.create(ModificarClientePage,{"cliente":this.cliente});
    modal.present();
  }
  eliminar(parametro){
    //Hace una eliminacion logica de los productos
   //modificando su estado a 0
   let confirmar = this.alertCtrl.create({
     title: 'Eliminar',
     message: '¿Desea eliminar este cliente?',
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
          
           firebase.database().ref('Clientes/' + this.cliente.id).set({
           estado:0,
           nombre:this.cliente.nombre,
           apellido:this.cliente.apellido,
           dni:this.cliente.dni,
           id:this.cliente.id,
           Telefono:this.cliente.Telefono,
           domicilio:this.cliente.domicilio,
           fecha_Nacimiento:this.cliente.fecha_Nacimiento,
           sexo:this.cliente.sexo,
           email:this.cliente.email
   });
   let toast = this.toastCtrl.create({
    message: 'Cliente Eliminado',
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
