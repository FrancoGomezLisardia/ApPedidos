import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NotesService } from "../../providers/notes.servise";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the DetallePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {
  clientes: FirebaseListObservable<any>;
  
note = {id:null, nombre:null,apellido:null, Direccion:null,Telefono:null,email:null,fecha_nacimiento:null};
id:null;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public notesService:NotesService,
    public alertCtrl: AlertController,
    public fireDatabase: AngularFireDatabase) {
    this.id=navParams.get('id');
    this.clientes = this.fireDatabase.list('/Clientes');
    //this.note=this.fireDatabase.object('Clientes/'+this.id);
    
    
    notesService.getNote(this.id)
    .subscribe(cliente =>{
    this.note= cliente;
    });
  
    
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePage');
  }
  AddNote(u){
    // if (this.id !=0){
      //editamos
      // this.clientes.update( u.$key, {
      //   nombre:this.model_clientes.nombre ,
      //   apellido:this.model_clientes.apellido,
      //   direccion: this.model_clientes.Direccion,
      //   telefono:this.model_clientes.Telefono,
        
      
    
      // this.note.id=Date.now();
      // this.notesService.editNotes(this.note);
      // alert("Cliente Editado");
      
    // }else  {
    // this.note.id=Date.now();
    // this.notesService.CrearClientes(this.note);
    // alert("Cliente Creado");
    
  // }
  // this.showAlert();
  // this.navCtrl.pop();}
  // showAlert() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Actualizacion Cliente',
  //     subTitle: this.model_clientes.nombre+" "+this.model_clientes.apellido+" ha sido modificado",
  //     buttons: ['OK']
  //   });
  //   alert.present();
   }
}
