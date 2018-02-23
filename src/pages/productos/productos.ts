import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,LoadingController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import {CargaImagenProductoProvider} from "../../providers/carga-imagen-producto/carga-imagen-producto";
import {CarroProvider} from"../../providers/carro/carro"
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
pedidos:FirebaseListObservable<any>;
  productos: FirebaseListObservable<any>;
  filtroproductos: FirebaseListObservable<any>;
  searchQuery: string = '';
  items: string[];
  constructor(
     
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public fireDatabase: AngularFireDatabase
  ) {
    this.productos = this.fireDatabase.list('/Productos');
    this.pedidos=this.fireDatabase.list('/PedidosSinConfirmar');
    let loading = this.loadingCtrl.create({
      content: 'Cargando pagina. Por favor, espere...'
  });
  loading.present();
  loading.dismiss();
  }
  initializeItems() {
    return this.fireDatabase.list('Productos/').subscribe( productos=>{
      this.items = productos});
  }

  getItems(ev: any) {
   
    // Restablecer items de nuevo a todos los items
    this.productos = this.fireDatabase.list('/Productos');
    
    // Ajuste val al valor de la barra de búsqueda
   let val = ev.target.value;

    // Si el valor es una cadena vacía no filtrar los elementos
     if (val && val.trim() != '') {
      this.productos = this.fireDatabase.list('/Productos', {
        query: {
          orderByChild: 'nombre',
          //startAt:val
          equalTo:val
        }
      }) //as FirebaseListObservable<any[]>;
      //return this.productos
    }
  }
  AgregarAPedido(u){
    let newTaskModal = this.alertCtrl.create({
      title: 'Agregar a Pedidos',
      message: u.nombre,
      inputs: [
        // {
        //   name: 'nombre',
        //   placeholder: 'Nombre:'
        // },
        {
          name: 'cantidad',
          placeholder: 'Cantidad:'
        },
        // {
        //   name: 'precio',
        //   placeholder: 'Precio:'
        // },
        //  {
           
        //   name: 'rubro',
        //   placeholder: 'Rubro:'
        // },
        
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.pedidos.push({
             	nombre: u.nombre,
  						cantidad: data.cantidad,
              precio:u.precio*data.cantidad
              //rubro:data.rubro,
            });
          }
        }
      ]
    });
    newTaskModal.present( newTaskModal );
  }


  
  AgregarProducto(){
    let newTaskModal = this.alertCtrl.create({
      title: 'Agregar Productos',
      //message: "Enter a title for your new task",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre:'
        },
        {
          name: 'cantidad',
          placeholder: 'Cantidad:'
        },
        {
          name: 'precio',
          placeholder: 'Precio:'
        },
         {
           
          name: 'rubro',
          placeholder: 'Rubro:'
        },
        
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.productos.push({
             	nombre: data.nombre,
  						cantidad: data.cantidad,
              precio:data.precio,
              rubro:data.rubro,
            });
          }
        }
      ]
    });
    newTaskModal.present( newTaskModal );
  }

  ActualizarProducto( u ){
  	let updateUserModal = this.alertCtrl.create({
  		title: "Actualizar Producto",
  		message: "Edita aquí la información de " + u.nombre,
  		inputs: [
  			{
         
  				name: "nombre",
  				placeholder: "Nombre",
  			  value: u.nombre
  			},
  			{
  				name:"cantidad",
  				placeholder: "Cantidad:",
          
  				value: u.cantidad
			}
  		],
  		buttons:[
  			{
  				text: "Cancelar",
  				handler: data => {
  					console.log('Cancel Clic');
  				}
  			},
  			{
  				text: "Guardar",
  				handler: data => {
  					this.productos.update( u.$key, {
  					nombre: data.nombre,
  						cantidad: data.cantidad
  					});
  				}
  			}
  		]
  	});
  	updateUserModal.present(updateUserModal);
  }


  removeUser(u){
    this.productos.remove(u);

    
  }
  CargarPagina() {
        let loading = this.loadingCtrl.create({
            content: 'Listando Productos. Por favor, espere...'
        });
        loading.present();
      }
        filtroProductos(filtro: string){
          this. filtroproductos=this.fireDatabase.list('/Productos',{
            query:{
              orderByChild:"nombre",
              equalTo: filtro
            }
          }) as FirebaseListObservable<any>;
          return this. filtroproductos;
        }

}
