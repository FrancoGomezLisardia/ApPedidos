import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from "../../providers/notes.servise";


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
note = {id:null, title:null, descripcion:null};
id:null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public notesService:NotesService) {
    this.id=navParams.get('id');
    if (this.id !=0){
      notesService.getNote(this.id)
      .subscribe(cliente =>{
        this.note= cliente;
      });
    }
    
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePage');
  }
  AddNote(){
    if (this.id !=0){
      //editamos
      this.note.id=Date.now();
      this.notesService.editNotes(this.note);
      alert("Cliente Editado");
      
    }else  {
    this.note.id=Date.now();
    this.notesService.CrearClientes(this.note);
    alert("Cliente Creado");
    
  }
  this.navCtrl.pop();}
}
