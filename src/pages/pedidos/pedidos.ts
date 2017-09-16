import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";

/**
 * Generated class for the PedidosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {
pedidos: FirebaseListObservable<any>;
testRadioOpen:boolean;
testRadioResult;
searchQuery: string = '';
items: string[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public fireDatabase: AngularFireDatabase,) {
    this.pedidos=fireDatabase.list('/pedidos');
    this.initializeItems();
    
  }
  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }
  getItems(ev: any) {
    // Restablecer items de nuevo a todos los items
    this.initializeItems();

    // Ajuste val al valor de la barra de búsqueda
    let val = ev.target.value;

    // Si el valor es una cadena vacía no filtrar los elementos
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  myDate(){
    alert("la concha");
  }
 showRadio(){
   let alert = this.alertCtrl.create();
   alert.setTitle("Radio");

   alert.addInput({
     type:"radio",
     label:"radio 1",
     value:"radio1"
    }); 

    alert.addInput({
     type:"radio",
     label:"radio 2",
     value:"radio2"
    }); 

    alert.addInput({
     type:"radio",
     label:"radio 3",
     value:"radio3"
    }); 

    alert.addButton("cancelar");
    alert.addButton({
     text:"ok",
     handler: data =>{
       console.log("Radio:",data);
       this.testRadioOpen=false;
       this.testRadioResult=data;
     }
    });
  
alert.present().then(()=>{
  this.testRadioOpen=true;
});
  
 }
}
