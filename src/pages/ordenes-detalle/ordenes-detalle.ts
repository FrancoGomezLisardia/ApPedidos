import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController} from 'ionic-angular';
import { FirebaseListObservable,  AngularFireDatabase  } from 'angularfire2/database';
import firebase from 'firebase';
import { OrdenesPage } from '../ordenes/ordenes';
/**
 * Generated class for the OrdenesDetallePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {
  resp:boolean=false;
  public pedidos_detalle_lista:Array<any>;
  public loadedCountryList:Array<any>;
  public pedidos_detalle_Ref:firebase.database.Reference;

pedidos_detalle_DB:FirebaseListObservable <any []>;
orden:any;
codigo_Detalle_Orden;
  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController,
              public alertCtrl:AlertController,
              public navParams: NavParams,
              public afDB: AngularFireDatabase) {
  this.orden=this.navParams.get("orden");
  
console.log("key_pedidos")
 console.log(this.orden.id_Detalle_Pedidos)
  }
  ionViewDidLoad() {

    console.log("CODIGO DETALLES");
    console.log(this.orden.id_Detalle_Pedidos)
    this.pedidos_detalle_DB = this.afDB.list('/pedidosDetalle', {
      query: {
        orderByChild: 'id_Detalle_Pedidos',
        equalTo:this.orden.id_Detalle_Pedidos
      }
    }
  )
  console.log("RESULTADO DE LA CONSULTA");
  console.log(this.pedidos_detalle_DB)


   //-------------------------------------------------------
   this.pedidos_detalle_Ref = firebase.database().ref('/pedidosDetalle');

   this.pedidos_detalle_Ref.on('value', pedidos_detalle_lista => {
     let detalles = [];
     pedidos_detalle_lista.forEach( detalle => {
       detalles.push(detalle.val());
       return false;
     });
   
     this.pedidos_detalle_lista = detalles;
   
   });
  //-------------------------------------------------------

  }
  borrar_pedidos(){
   
    let confirmar = this.alertCtrl.create({
      title: 'Eliminar',
      message: '¿Desea eliminar esta orden?',
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
            console.log('Presiono Aceptar');
            let id_detalle=this.orden.id_Detalle_Pedidos
      let pedidos_detalle = this.afDB.list('/pedidosDetalle', {
        query: {
          orderByChild: 'id_Detalle_Pedidos',
          equalTo:id_detalle,
        }
      })//consulta a nodo detalle pedidos segundo el id_detalle
      pedidos_detalle.remove()//elimina detalle pedidos
      let pedidos = this.afDB.list('/pedidos');
      pedidos.remove(this.orden) ;//elimina pedidos
    
      let toast = this.toastCtrl.create({
        message: 'Orden eliminada',
        duration: 3000
      });
      toast.present();
        
      this.navCtrl.setRoot(OrdenesPage);
          }
        }
      ]
    });
  confirmar.present();
  }
  

   

}
