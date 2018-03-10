import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';
/**
 * Generated class for the ModificarClientePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modificar-cliente',
  templateUrl: 'modificar-cliente.html',
})
export class ModificarClientePage {
cliente_modificar={
  estado:1,
  nombre:null,
  apellido:null,
  dni:null,
  id:null,
  Telefono:null,
  domicilio:null,
  fecha_Nacimiento:null,
  sexo:null,
  email:null

}
id:null;
cliente:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public alertCtrl:AlertController,
              public afDB:AngularFireDatabase,
              public toastCtrl:ToastController) {
                this.cliente=this.navParams.get("cliente");
                this.id=this.cliente.id

                this.getCliente(this.id)
                .subscribe(cliente =>{
                  this.cliente_modificar= cliente;
      
                  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificarClientePage');
  }
  cerrarModal() {
    this.viewCtrl.dismiss();
   }

   public getCliente(id){
    return this.afDB.object('Clientes/'+id);
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
          
           firebase.database().ref('Clientes/' + this.id).set({
           estado:this.cliente_modificar.estado,
           nombre:this.cliente_modificar.nombre,
           apellido:this.cliente_modificar.apellido,
           dni:this.cliente_modificar.dni,
           id:this.id,
           Telefono:this.cliente_modificar.Telefono,
           domicilio:this.cliente_modificar.domicilio,
           fecha_Nacimiento:this.cliente_modificar.fecha_Nacimiento,
           sexo:this.cliente_modificar.sexo,
           email:this.cliente_modificar.email
   });
   let toast = this.toastCtrl.create({
    message: 'Cliente Modificado',
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
