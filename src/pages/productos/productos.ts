import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,ModalController,
         MenuController,ViewController,LoadingController,NavParams,Platform} from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import {CargaImagenProductoProvider} from "../../providers/carga-imagen-producto/carga-imagen-producto";
import {DetalleProductoPage} from "../../pages/detalle-producto/detalle-producto";
import firebase from 'firebase';
import {NuevoProductoPage} from "../nuevo-producto/nuevo-producto";
import {CarritoPage} from "../../pages/carrito/carrito";
import {Storage}                    from "@ionic/storage";
import {ModificarProductosPage} from "../../pages/modificar-productos/modificar-productos"
/**
 * Generated class for the ProductosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {
usuario_actual:any;
//Variables barra de busqueda
  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:any;
//------------------------------------------------
pedidos:FirebaseListObservable<any>;
  productos: FirebaseListObservable<any>;
  filtroproductos: FirebaseListObservable<any>;
  cantidadProdEnCarrito;
  constructor(
    private viewCtrl:ViewController,
    private platform:Platform,
    private storage:Storage,
    private _cap:CargaImagenProductoProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public fireDatabase: AngularFireDatabase,
    private modalCtrl:ModalController,
    public navParams:NavParams,
    public menuCtrl: MenuController,
    public  loadingCtrl:LoadingController
  ) {
    let loading = this.loadingCtrl.create({
      content: 'Cargando Productos. Por favor, espere...'
  });
  loading.present();
 
  this.menuCtrl.get().enable(true);
  this.productos=this.fireDatabase.list('post')
  //INFORMACION USUARIO ACTUAL
  this.usuario_actual=this.navParams.get("usuarioLogeado");
  //console.log("Usuario Actual:"this.usuarioLogeado2);

  //-------------------------------------------------
  this.cargar_storage();
    this.cantidadProdEnCarrito=_cap.arreglo.length;
    //-------------------------------------------------------
    
   this.countryRef  = firebase.database().ref('post')
                              .orderByChild('estado')
                               .equalTo(1);//Referencia a los productos de estado 1
    this.countryRef.on('value', countryList => {
      let countries = [];
      countryList.forEach( country => {
        countries.push(country.val());
        return false;
      });
    
      this.countryList = countries;
      this.loadedCountryList = countries;
      
    });
   //-------------------------------------------------------
   loading.dismiss();
   console.log("Carrito longitud:",this._cap.arreglo.length)
  }
  guardar_storage(){
    //Condicion para saber si la app esta corriendo en dispositivo o pc
    if(this.platform.is("cordova")){
    //dispositivo
  this.storage.set("usuarioLogeado",this.usuario_actual)
    }else{
  //Computadora
  localStorage.setItem("usuarioLogeado",JSON.stringify(this.usuario_actual));
}
 
  
}
eliminar(parametro){
   //Hace una eliminacion logica de los productos
  //modificando su estado a 0
  let confirmar = this.alertCtrl.create({
    title: 'Eliminar',
    message: '¿Desea eliminar este producto?',
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
         
          firebase.database().ref('post/' + parametro.key).set({
          estado:0,
          img:parametro.img,
          key:parametro.key,
          precio:parametro.precio,
          stock:parametro.stock,
          titulo:parametro.titulo
  });

        }
      }
    ]
  });
  confirmar.present()
  
}
  cargar_storage(){
    let promesa = new Promise((resolve, reject)=>{
      if(this.platform.is("cordova")){
        //dispositivo
     this.storage.ready()
     .then(()=>{
       this.storage.get("usuarioLogeado")
       .then(usuarioLogeado=>{
         if(usuarioLogeado){
           this.usuario_actual=usuarioLogeado;
            }
            resolve();
       })
    });
        }else{
      //Computadora
      if(localStorage.getItem(("usuarioLogeado"))){
        //Existe items en localStorage
      }
     this.usuario_actual=JSON.parse(localStorage.getItem("items"));
      resolve();
  
        }
    });
    return promesa;
  
  }

  nuevoProducto(){
    //this.navCtrl.setRoot(NuevoProductoPage);
    let modal =this.modalCtrl.create(NuevoProductoPage);
    modal.present();
      }
  modificar(parametro){
    //this.navCtrl.setRoot(ModificarProductosPage,{"producto":parametro});
    let modal =this.modalCtrl.create(ModificarProductosPage,{"producto":parametro});
    modal.present();
      }
  
  IrADetalleProducto(parametro:any){
  
    let modal =this.modalCtrl.create(DetalleProductoPage,{'producto':parametro});
    modal.present();
  }
  initializeItems2(): void {
    this.countryList = this.loadedCountryList;
    console.log(this.countryList);
  }
//---------------------------------------------------
  getItems2(searchbar) {
    // Reset items back to all of the items
    this.initializeItems2();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.countryList = this.countryList.filter((v) => {
      if(v.titulo && q) {
        if (v.titulo.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.countryList.length);
  
  }
  //---------------------------------------------------
 
 irAPaginaCarrito(){
  //this.navCtrl.setRoot("CarritoPage");    
  let modal =this.modalCtrl.create(CarritoPage);
  modal.present();
 }
}
