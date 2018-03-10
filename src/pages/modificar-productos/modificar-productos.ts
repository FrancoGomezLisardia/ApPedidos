import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { model_productos } from '../../models/modelo_producto';


/**
 * Generated class for the ModificarProductosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modificar-productos',
  templateUrl: 'modificar-productos.html',
})
export class ModificarProductosPage {
producto:any;


prod_a_modificar = {
  id:null,
  titulo:null, 
  stock:null,
  precio:null,
  estado:1};
  id:null;
  imagenPreview:string = "";
  imagen64:string;
  
  constructor(public navCtrl: NavController,
              public toastCtrl:ToastController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl:AlertController,
                                       
              public afDB:AngularFireDatabase) {
                
                this.producto=this.navParams.get("producto")//lista de productos
                this. imagenPreview=this.producto.img//imagen
                this.imagen64=this.imagenPreview
                this.id=this.producto.key//clave productos
                
                this. getProducto(this.id)
                .subscribe(producto =>{
                  this.prod_a_modificar= producto;
      
                  });
          }

  cerrarModal() {
    this.viewCtrl.dismiss();
   }
 

   public getProducto(id){
    return this.afDB.object('post/'+id);
}
   modificar(){ 
     
     let prod_modificado = {
      key:this.id,
      titulo:this.prod_a_modificar.titulo, 
      stock:this.prod_a_modificar.stock,
      precio:this.prod_a_modificar.precio,
      estado:1,
      img:this.imagen64
    };
    let confirmar = this.alertCtrl.create({
      title: 'Modificar',
      message: '¿Confirma la modificacion?',
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
            firebase.database().ref('post/' + this.producto.key).set(prod_modificado);
            let toast = this.toastCtrl.create({
              message: 'Producto Modificado',
              duration: 3000
            });
            toast.present();

            this.viewCtrl.dismiss();
          }
      }
     ]
});
confirmar.present()
   }//TERMINA
}
