import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {CarritoProvider} from "../../providers/carrito";
import {CargaImagenProductoProvider} from "../../providers/carga-imagen-producto/carga-imagen-producto";
import { ProductosPage } from '../productos/productos';
@IonicPage()
@Component({
  selector: 'page-detalle-producto',
  templateUrl: 'detalle-producto.html',
})
export class DetalleProductoPage {
product:any;
cantidad:number=1;//Cabtidad de productos del mismo tipo
subTotal:number;//suma parcial de los productos del mismo tipo
  constructor(
    public viewCtrl:ViewController,
    public cip:CargaImagenProductoProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,                        
              ) {
                this.cantidad=1;//Cabtidad de productos del mismo tipo
                this.subTotal=0;
                this.product=this.navParams.get("producto");
                console.log(this.product);
                this.subTotal=this.product.precio;
             
              this.cip.cantidad=1;
              this.cip.subTotal=this.product.precio
  }
  cerrarModal() {
    this.viewCtrl.dismiss();
   }
  sumar_cantidad(){
    this.cantidad+=1;
    console.log(this.cantidad)
    this.subTotal=this.product.precio * this.cantidad
    console.log("SUMAR CANTIDAD")
    
    this.cip.subTotal=this.subTotal//asigna subtotal a variable subtotal de CIP
    this.cip.cantidad=this.cantidad//asigna cantidad a variable cantidad de CIP
    console.log(this.cip.subTotal);
    console.log(this.cip.cantidad);
  }
  restar_cantidad(){
    this.cantidad-=1;
    this.subTotal-=this.product.precio 
    this.cip.subTotal=this.subTotal//asigna subtotal a variable subtotal de CIP
    this.cip.cantidad=this.cantidad//asigna cantidad a variable cantidad de CIP
    console.log("RESTAR CANTIDAD")
    console.log(this.cip.subTotal);
    console.log(this.cip.cantidad);
  }
  agregar_carrito(product){
    this.cip.agregar_carrito(product)
    this.navCtrl.setRoot(ProductosPage)
  }
}

