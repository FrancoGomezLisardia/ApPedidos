import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { NotesService } from '../../providers/notes.servise';
import {DetallePage}            from '../../pages/detalle/detalle';
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

notes=[];
 clientes: FirebaseListObservable<any>;


  constructor( public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public fireDatabase: AngularFireDatabase,
    public notesService:NotesService
  ) {
    notesService.getNotes().subscribe( clientes=>{
      this.notes = clientes});
    this.clientes = this.fireDatabase.list('/Clientes');
  }
public CrearClientes(){
  this.navCtrl.push(DetallePage,{id:0});
}

public goToNuevoCliente(id){
  this.navCtrl.push(DetallePage,{id:id});
}
AgregarCliente(){
    let newTaskModal = this.alertCtrl.create({
      title: 'Agregar Cliente',
      //message: "Enter a title for your new task",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre:'
        },
        {
          name: ' apellido',
          placeholder: 'Apellido:'
        },
        {
          name: 'direccion',
          placeholder: 'Direccion:'
        },
         {
           
          name: 'telefono',
          placeholder: 'Telefono:'
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
            this.clientes.push({
             	nombre: data.nombre,
  					//	apellido: data.apellido,
              direccion: data.direccion,
              telefono:data.telefono,
              
            });
          }
        }
      ]
    });
    newTaskModal.present( newTaskModal );
  }

  ActualizarClientes( u ){
  	let updateUserModal = this.alertCtrl.create({
  		title: "Actualizar Clientes",
  		message: "Edita aquí la información de " + u.nombre +","+u.apellido ,
  		inputs: [
  			{
          name: 'nombre',
          placeholder: 'Nombre:'
        },
        {
          name: ' apellido',
          placeholder: 'Apellido:'
        },
        {
          name: 'direccion',
          placeholder: 'Direccion:'
        },
         {
           
          name: 'telefono',
          placeholder: 'Telefono:'
        },
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
  					this.clientes.update( u.$key, {
  						nombre: data.nombre,
  						apellido: data.apellido,
              direccion: data.direccion,
              telefono:data.telefono,
  					});
  				}
  			}
  		]
  	});
  	updateUserModal.present(updateUserModal);
  }


  removeUser(user){
  	this.clientes.remove(user);
  }
  CargarPagina() {
        let loading = this.loadingCtrl.create({
            content: 'Listando Productos. Por favor, espere...'
        });
        loading.present();}


}

