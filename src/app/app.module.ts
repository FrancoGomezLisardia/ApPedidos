import { BrowserModule }                            from '@angular/platform-browser';
import { ErrorHandler, NgModule }                   from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen }                             from '@ionic-native/splash-screen';
import { StatusBar }                                from '@ionic-native/status-bar';


import { MyApp }                from './app.component';
import { HomePage }             from '../pages/home/home';
import { ProductosPage }        from '../pages/productos/productos';
import { ClientesPage }         from '../pages/clientes/clientes';
import { PedidosPage }          from '../pages/pedidos/pedidos';
import { VendedoresPage }       from '../pages/vendedores/vendedores';
import { SignInPage }           from '../pages/signin/signin';
import { SignUpPage }           from '../pages/signup/signup';
import {PerfilPage}             from '../pages/perfil/perfil';
import {DetallePage}            from '../pages/detalle/detalle';
import {RegistrarPage}          from '../pages/registrar/registrar';
import {FormularioPage}          from '../pages/formulario/formulario';

import { AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule }     from 'angularfire2/auth';

import { AuthService } from '../providers/auth-service';
import { NotesService } from '../providers/notes.servise';

export const firebaseConfig = {
 apiKey: "AIzaSyCeLmkUIANCNvjQU0IRhiqjxYQKr6ds_UI",
    authDomain: "apppfc.firebaseapp.com",
    databaseURL: "https://apppfc.firebaseio.com",
    projectId: "apppfc",
    storageBucket: "apppfc.appspot.com",
    messagingSenderId: "848922468545"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductosPage,
    ClientesPage,
    PedidosPage,
    VendedoresPage,
    SignInPage ,
    SignUpPage,
    PerfilPage,

    DetallePage,
    RegistrarPage,
    FormularioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductosPage,
    ClientesPage,
    PedidosPage,
    PerfilPage,
     VendedoresPage,
    
    SignInPage ,
    SignUpPage,

    DetallePage,
    RegistrarPage,

    FormularioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    NotesService
  ]
})
export class AppModule {}
