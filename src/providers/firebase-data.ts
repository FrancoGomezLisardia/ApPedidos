import firebase from 'firebase';
import {Injectable} from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class Firebase_Data {

  saveData( name,lastName) {
    
    return firebase.database().ref('songs')
    .push({ name,lastName, });
      
  }
}