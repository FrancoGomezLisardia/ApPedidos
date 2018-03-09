import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController,Platform} from "ionic-angular" 
//Plugin Storage
import{Storage}from "@ionic/storage";
/*""
  Generated class for the CarritoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CarritoProvider {
items:any[]=[];
cantidad:any;
  constructor(public http: Http,
  private alertCtrl:AlertController,
  private platform:Platform,
  private storage:Storage) {
    console.log('Hello CarritoProvider Provider');
  }

  agregar_carrito(item_parametro:any){
    
  //   for (let item of this.items){
  //     if(item.key ==  item_parametro.key){
  //       this.alertCtrl.create({
  //         title:"Alerta Stock",
  //         subTitle:"La cantidad ingresada supera el stock disponible",
  //         buttons:["Aceptar"]
  //       }).present();
  //       return;
  //   }
  // }

}
guardar_storage(){
  //Condicion para saber si la app esta corriendo en dispositivo o pc
  if(this.platform.is("cordova")){
  //dispositivo
this.storage.set("items",this.items)
  }else{
//Computadora
localStorage.setItem("item",JSON.stringify(this.items));

  }
}
cargar_storage(){
  let promesa = new Promise((resolve, reject)=>{
    if(this.platform.is("cordova")){
      //dispositivo
   this.storage.ready()
   .then(()=>{
     this.storage.get("items")
     .then(items=>{
       if(items){
         this.items=items;
          }
          resolve();
     })
  });
      }else{
    //Computadora
    if(localStorage.getItem(("items"))){
      //Existe items en localStorage
    }
   this.items=JSON.parse(localStorage.getItem("items"));
    resolve();
    
      }
  });
  return promesa;
  
}
}