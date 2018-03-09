import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { model_productos } from '../../models/modelo_producto';
import { Camera,CameraOptions}        from '@ionic-native/camera';
import { ImagePicker,ImagePickerOptions }         from '@ionic-native/image-picker';
import {ProductosPage} from "../../pages/productos/productos"
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
              private camera: Camera,
              private imagePicker: ImagePicker,              
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
   seleccionar_imagen(){

    let opciones:ImagePickerOptions={
      quality:70,
      outputType:1,
      maximumImagesCount:1
    }
    this.imagePicker.getPictures( opciones).then((results) => {
      for (var i = 0; i < results.length; i++) {
          //console.log('Image URI: ' + results[i]);
          this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
          this.imagen64=results[i];
        }
    }, (err) => {
      console.log("Error al seleccionar",JSON.stringify(err))
    });
  }
mostrar_camara(){
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64:
   this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
  this.imagen64=imageData; 
 
  }, (err) => {
   // Handle error
   console.log("Error en camara",JSON.stringify(err))
  });
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

            this.navCtrl.setRoot(ProductosPage)
          }
      }
     ]
});
confirmar.present()
   }//TERMINA
}
