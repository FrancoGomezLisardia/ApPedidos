import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController,ViewController} from 'ionic-angular';
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
  pedidosRef;
  public pedidos_lista:Array<any>;
  
pedidos_detalle_DB:FirebaseListObservable <any []>;
pedidos_DB:FirebaseListObservable <any []>;

orden:any;
codigo_Detalle_Orden;
id_cliente:any;
id_usuario:any;
usuarioRef;
public usuario_lista:Array<any>;
clienteRef;
total;
public cliente_lista:Array<any>;
  constructor(public navCtrl: NavController, 
              public viewCtrl:ViewController,
              public toastCtrl: ToastController,
              public alertCtrl:AlertController,
              public navParams: NavParams,
              public afDB: AngularFireDatabase) {
  this.orden=this.navParams.get("orden");
  this.total=this.orden.Total
console.log("key_pedidos")
 console.log(this.orden.id_Detalle_Pedidos)
  }
  ionViewDidLoad() {
   

    this.pedidos_detalle_DB = this.afDB.list('/pedidosDetalle', {
      query: {
        orderByChild: 'id_Detalle_Pedidos',
        equalTo:this.orden.id_Detalle_Pedidos
      }
    }
  )
//---------------------------------------------------------------------
//Referencia a nodo pedidos asociado al detalle correspondiente
  this.pedidosRef  = firebase.database().ref('pedidos')
                             .orderByChild('id_Detalle_Pedidos')
                             .equalTo(this.orden.id_Detalle_Pedidos);

 this.pedidosRef.on('value', pedidos_lista => {
     let pedidos = [];
     pedidos_lista.forEach( pedido => {
       pedidos.push(pedido.val());
       return false;
     });
   
     this.pedidos_lista = pedidos;
   
   });
   console.log(this.pedidos_lista)
   for(let i of this.pedidos_lista){
      this.id_cliente=i.id_cliente;
      this.id_usuario=i.id_usuario
   }
 this.usuarioRef=firebase.database().ref('Usuarios')
                      .orderByChild("id")
                      .equalTo(this.id_usuario)
  this.usuarioRef.on('value', usuario_lista => {
    let usuarios = [];
    usuario_lista.forEach( usuario => {
      usuarios.push(usuario.val());
      return false;
    });
  
    this.usuario_lista = usuarios;
  });

this.clienteRef=firebase.database().ref('Clientes')
                      .orderByChild("id")
                      .equalTo(this.id_cliente)   
 this.clienteRef.on('value', cliente_lista => {
  let clientes = [];
  cliente_lista.forEach( cliente => {
    clientes.push(cliente.val());
    return false;
  });

  this.cliente_lista = clientes;
 

});                
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
cerrarModal() {
  this.viewCtrl.dismiss();
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
        
      this.viewCtrl.dismiss();
          }
        }
      ]
    });
  confirmar.present();
  }
  

   

}
