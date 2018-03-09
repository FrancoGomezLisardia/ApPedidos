import { Component }        from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, MenuController }     from 'ionic-angular';
import { Camera,CameraOptions}        from '@ionic-native/camera';
import { ImagePicker,ImagePickerOptions }         from '@ionic-native/image-picker';
import {CargaImagenProductoProvider}        from "../../providers/carga-imagen-producto/carga-imagen-producto";
@Component({
  selector: 'page-nuevo-producto',
  templateUrl: 'nuevo-producto.html',
})
export class NuevoProductoPage {
titulo: string = "";
Stock: number;
precio:string="";
imagenPreview:string = "";
imagen64:string;
estado=1;
  constructor(
              private imagePicker: ImagePicker,
              public menuCtrl: MenuController,
              private camera: Camera,
              public cap:CargaImagenProductoProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl:ViewController) {
               
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
registrar(){
  let archivo={
    img:this.imagen64,
    titulo:this.titulo,
    stock: this.Stock,
    precio:this.precio,
    estado:this.estado
  };
  this.cap.cargar_imagen_firebase(archivo);
}
}
