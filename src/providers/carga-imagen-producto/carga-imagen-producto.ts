import { Injectable } from '@angular/core';

import { ToastController,Platform } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';


import * as firebase from 'firebase';

import 'rxjs/add/operator/map';
import{Storage}from "@ionic/storage";
import {AlertController} from "ionic-angular"
import { ProductosPage } from '../../pages/productos/productos';
@Injectable()
export class CargaImagenProductoProvider {
  cantidad:number;//Cabtidad de productos del mismo tipo
  subTotal:number;//suma parcial de los productos del mismo tipo
  imagenes: archivoSubir[] = [];
  lastKey: string = null;
  items: any[] = [];
  arreglo: any[] = [];
  productos: FirebaseListObservable <any []>;
  ref;
  total_carrito:number=0;//Almacena el total de los precios en el carrito
  usuario_actual:any[] = [];//contiene id del usuario logeado
  ordernes:any[]=[]//contiene los datos del nodo pedidos de la base de datos
  imagen="/assets/imagenes/azul.png"//ruta imagen principal
  cliente:any[] = [];//cliente asiganado al peddio
  constructor( public toastCtrl: ToastController,
               public afDB: AngularFireDatabase,
               
               private alertCtrl:AlertController,
               private platform:Platform,
               private storage:Storage ) {

    //this.cargar_ultimo_key()
    //.subscribe( ()=> this.cargar_imagenes() )
    //this.ref = firebase.database().ref("post").subscribe();
this.cargar_storage();
this.actualizar_total();
  }

agregar_carrito(item_parametro:any){

   //tiene los atributos del producto en el 
  //carrito mas la cantidad solicitada y
  // el subtotal 
   let producto_en_carro:carrito={
    precio: item_parametro.precio,
    stock:item_parametro.stock,
    titulo:item_parametro.titulo,
    img:item_parametro.img,
    key:item_parametro.key,
    cantidad:this.cantidad,
    sub_total:this.subTotal
  }
 console.log("Nuevo arreglo")
 this.arreglo.push(producto_en_carro);
 console.log(this.arreglo);
 console.log("-----------------------")
 let toast = this.toastCtrl.create({
  message: 'Producto cargado al carrito',
  duration: 3000
});
toast.present();
   this.actualizar_total();
   this.guardar_storage()
   
   return;

}
actualizar_total(){
  this.total_carrito=0;
  for (let index = 0; index < this.arreglo.length; index++) {
    const element = this.arreglo[index];
    console.log("subtotal:",element.sub_total)
    console.log()
    this.total_carrito+=Number(element.sub_total);
    console.log("TOTAL",this.total_carrito)
  }
}
  cargar_ultimo_key(){

    var ref = firebase.database().ref("post");
    return ref.orderByKey().limitToLast(1).on("child_added", function(snapshot) {
      console.log("cargar_ultimo_key");
      console.log(snapshot.val());
      this.lastKey = snapshot.key;
      this.imagenes.push(snapshot.val());
    }, this);

  }
  cargar_imagenes(){

    return new Promise( (resolve, reject)=>{

      this.ref
      .limitToLast(3)
      .orderByKey().endAt(this.lastKey)
      .subscribe(  (posts:any)=>{

          posts.pop();

          if( posts.length == 0 ){
            console.log('Ya no hay más registros');
            resolve(false);
            return;
          }

          this.lastKey = posts[0].key;

          for( let i = posts.length-1;  i >=0; i-- ){
            let post = posts[i];
            this.imagenes.push(post);
          }

          resolve(true);

        });



    });

  }
  cargar_imagen_firebase( archivo: archivoSubir){

    let promesa = new Promise( (resolve, reject)=>{

      this.mostrar_Toast('Cargando...');

      let storeRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString(); // 1231231231

      let uploadTask: firebase.storage.UploadTask =
          storeRef.child(`img/${ nombreArchivo }`)
                  .putString( archivo.img, 'base64', { contentType: 'image/jpeg' }  );

         uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
            ()=>{ }, // saber el % de cuantos Mbs se han subido
            ( error ) =>{
              // manejo de error
              console.log("ERROR EN LA CARGA");
              console.log(JSON.stringify( error ));
              this.mostrar_Toast(JSON.stringify( error ));
              reject();
            },
            ()=>{
              // TODO BIEN!!
              console.log('Archivo subido');
              this.mostrar_Toast('Imagen cargada correctamente');
              
              let url = uploadTask.snapshot.downloadURL;

              this.crear_post( archivo.titulo, url, nombreArchivo,archivo.precio,archivo.stock,archivo.estado );

              resolve();
            }

          )});

    return promesa;

  }

  private crear_post( titulo: string, url: string, nombreArchivo:string,precio:string,stock:number,estado:number ){

    let post: archivoSubir = {
      precio:precio,
      stock:stock,
      img: url,
      titulo: titulo,
      key: nombreArchivo,
      estado:estado
    };
    console.log( JSON.stringify(post) );

    // this.afDB.list('/post').push(post)
    this.afDB.object(`/post/${ nombreArchivo }`).update(post);

    this.imagenes.push( post );

  }

mostrar_Toast (mensaje: string) {
  this.toastCtrl.create({
    message: mensaje,
    duration: 2000
  }).present();
}

guardar_storage(){
  //Condicion para saber si la app esta corriendo en dispositivo o pc
  if(this.platform.is("cordova")){
  //dispositivo
this.storage.set("items",this.arreglo)
  }else{
//Computadora
localStorage.setItem("item",JSON.stringify(this.arreglo));

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

eliminar_items(idx:number){//Elimina elementos del arreglo que tiene las ordenes
    this.arreglo.splice(idx,1);
    this.guardar_storage();
}
realizar_pedido(){
 // let detalle_pedidos_arreglo:string[]=[];
  let id_usuario_actual;
  let id_pedidos= new Date().valueOf().toString();//id para nodo Pedidos
  let id_Detalle_Pedidos= new Date().valueOf().toString();//id del detalle para cada producto
  let id_cliente_asignado;
 for (let index of this.cliente) {//Recorre arreglo del cliente asiganado al carrito
  id_cliente_asignado=index.id
 }
 for (let index of this.usuario_actual) {//Recorre arreglo del usuario logeado
  id_usuario_actual=index.id
 }
  
  for (let index = 0; index < this.arreglo.length; index++) {
    let key_detalle_pedido=new Date().valueOf().toString(); //clave del nodo detalle_pedidos
    const element = this.arreglo[index];
    let  pedidos_detalle:detalle_peddio={
      id_Detalle_Pedidos:id_Detalle_Pedidos,
      nombre_producto:element.titulo,
      imge:element.img,
      sub_Total:this.subTotal,
      cantidad:this.cantidad
    
    }
  
    console.log("Interface Detalle Pedidos:", pedidos_detalle)
    this.afDB.object(`/pedidosDetalle/${key_detalle_pedido }`).update(pedidos_detalle)
   // this.afDB.object('/pedidosDetalle').update(pedidos_detalle)
   
       
 } 
let pedido_carrito: pedido={
  key_pedidos:id_pedidos,
  id_usuario: id_usuario_actual,
  id_cliente:id_cliente_asignado,
  id_Detalle_Pedidos:id_Detalle_Pedidos,
  Total:this.total_carrito,
}
this.afDB.object(`/pedidos/${id_pedidos }`).update(pedido_carrito)

this.arreglo=[];
 }

 cargar_ordenes(){

   let listaOrdenesRef=firebase.database().ref('/pedidos');
  listaOrdenesRef.on('value', lista_ordenes_BD => {
    let ordenes_BD = [];
    lista_ordenes_BD.forEach( orden => {
      ordenes_BD.push(orden.val());
      return false;
    });
    this.ordernes = ordenes_BD;
    
  });
 //------------------------------------------------------- 
 }
 
}
interface carrito{
  precio: string;
  stock: number;
  titulo:string;
  img:string;
  key?:string;
  cantidad:number;
  sub_total;
}
interface detalle_peddio{
  id_Detalle_Pedidos:string,
  nombre_producto:string,
  imge:string,
  sub_Total:number,
  cantidad:number
  key_detalle_pedido?:string
}
interface pedido{
  key_pedidos:string;
  id_usuario:string;
  id_cliente:string;
  id_Detalle_Pedidos;
  Total:number;
  
}
interface archivoSubir{
  precio: string;
  stock: number;
  titulo:string;
  img:string;
  key?:string;
  estado:number;

}
