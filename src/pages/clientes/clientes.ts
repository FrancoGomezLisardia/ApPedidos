import { Component }            from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, 
        AlertController,ModalController,ToastController,ViewController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase} from "angularfire2/database";
import {NuevoClientePage}       from '../../pages/nuevo-cliente/nuevo-cliente';
import {DetalleClientePage}     from '../../pages/detalle-cliente/detalle-cliente'
import {CargaImagenProductoProvider} from "../../providers/carga-imagen-producto/carga-imagen-producto"
import firebase from 'firebase';

/**
 * Generated class for the ClientesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {
  clientes: FirebaseListObservable<any>;
  //Variables barra de busqueda
  public clientesList:Array<any>;
  public loadedClientesList:Array<any>;
  public clientesRef:any;
//------------------------------------------------
 
  constructor( public loadingCtrl: LoadingController,
    public viewCtrl:ViewController,
    public cip:CargaImagenProductoProvider,
    public modalCtrl:ModalController,
    public navCtrl: NavController,
    public toastCtrl:ToastController,
    public alertCtrl: AlertController,
    public fireDatabase: AngularFireDatabase,
       
  ) {
    this.clientes = this.fireDatabase.list('/Clientes');
   
     //-------------------------------------------------------
    
    this.clientesRef  = firebase.database().ref('Clientes')
                                .orderByChild('estado')
                                .equalTo(1);//Referencia a los productos de estado 1
     //  .orderByChild('estado')
      //   .equalTo(1);//Referencia a los productos de estado 1
    this.clientesRef.on('value', clientesList => {
    let clientes = [];
    clientesList.forEach( cliente => {
    clientes.push(cliente.val());
    return false;
    });

    this.clientesList = clientes;
    this.loadedClientesList = clientes;

    });
      //-------------------------------------------------------
  }
  agregarClienteACarrito(cliente){
     this.cip.cliente=[]
      this.cip.cliente.push(cliente)
      console.log(this.cip.cliente)
      let toast = this.toastCtrl.create({
        message: 'Cliente asignado al carrito',
        duration: 3000
      });toast.present();
      if(this.cip.arreglo.length!=0){
        this.viewCtrl.dismiss();
      } 
  }

  initializeItems2(): void {
    this.clientesList = this.loadedClientesList;
    console.log(this.clientesList);
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
  
    this.clientesList = this.clientesList.filter((v) => {
      if(v.apellido && q ) {
        if ((v.apellido.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.clientesList.length);
  
  }
  //---------------------------------------------------
  detalleCliente(cliente){
    let modal =this.modalCtrl.create(DetalleClientePage,{'cliente':cliente});
    modal.present();
  }
  nuevoCliente(){
    let modal =this.modalCtrl.create(NuevoClientePage);
    modal.present();
  }
}

