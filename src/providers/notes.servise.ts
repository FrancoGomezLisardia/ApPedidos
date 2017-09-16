import {Injectable} from "@angular/core";

import { AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class NotesService{
constructor(public afDB:AngularFireDatabase){}
    notes= [
        { id:1, title:"holasasdas",descripcion:"deasdasdscripcion"},
        { id:2, title:"hola",descripcion:"descripcion"}
    ];
public getNotes(){
    //return this.notes;
    return this.afDB.list('Clientes/');
}
public getNote (id){
    //return this.notes.filter(function(e,i){return e.id==id})[0] || {id:null, title:null, descripcion:null} ;
    return this.afDB.object('Clientes/'+id);
}
public CrearClientes(note){ 
//this.notes.push(note);
this.afDB.database.ref('Clientes/'+note.id).set(note);
}
public editNotes(note){
    for (let i; i < this.notes.length;i++){
        if (this.notes [i].id==note.id){
            this.notes[i]=note;
        }
    }
}

}
