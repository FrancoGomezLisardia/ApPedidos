import { BrowserModule }                            from '@angular/platform-browser';
import { ErrorHandler, NgModule }                   from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen }                             from '@ionic-native/splash-screen';
import { StatusBar }                                from '@ionic-native/status-bar';
import { AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { MyApp }                from './app.component';

//PAGINAS
//Clientes
import { ClientesPage }         from '../pages/clientes/clientes';
import {NuevoClientePage}       from '../pages/nuevo-cliente/nuevo-cliente';
import {ModificarClientePage}   from '../pages/modificar-cliente/modificar-cliente';
import {DetalleClientePage}     from '../pages/detalle-cliente/detalle-cliente'

//Productos
import { ProductosPage }        from '../pages/productos/productos';
import {DetallePage}            from '../pages/detalle/detalle';
import {NuevoProductoPage}      from '../pages/nuevo-producto/nuevo-producto';
import {OrdenesPage}              from       "../pages/ordenes/ordenes";
import {ModificarProductosPage}   from "../pages/modificar-productos/modificar-productos"
import { CarritoProvider }       from '../providers/carrito';
import {DetalleProductoPage} from "../pages/detalle-producto/detalle-producto";
import {CarritoPage}        from "../pages/carrito/carrito";
//Usuarios
import {RegistrarUsuarioPage} from "../pages/registrar-usuario/registrar-usuario"
import {InicioSesionPage} from "../pages/inicio-sesion/inicio-sesion";
import {FormularioPage}          from '../pages/formulario/formulario';
import {DetalleUsuarioPage}         from '../pages/detalle-usuario/detalle-usuario'
import {UsuariosPage}       from '../pages/usuarios/usuarios';
import {ModificarUsuarioPage}         from '../pages/modificar-usuario/modificar-usuario'
//Servicios
import { NotesService } from '../providers/notes.servise';
import { ProductosProvider } from '../providers/productos/productos';

//Plugins
import { Camera} from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { CargaImagenProductoProvider } from '../providers/carga-imagen-producto/carga-imagen-producto';
import { CarroProvider } from '../providers/carro/carro';
import { IonicStorageModule } from '@ionic/storage';


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
    ModificarClientePage,
    DetalleClientePage,
    ProductosPage,
    ClientesPage,
    ModificarProductosPage,
    OrdenesPage,
    NuevoClientePage,
    NuevoProductoPage,
    DetallePage,
    FormularioPage,
    DetalleProductoPage,
    RegistrarUsuarioPage,
    InicioSesionPage,
    CarritoPage,
    DetalleUsuarioPage,
    UsuariosPage,
    ModificarUsuarioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),

    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProductosPage,
    ClientesPage,
    OrdenesPage,
     NuevoClientePage,
     ModificarProductosPage,
     ModificarClientePage,
    DetalleClientePage,
    NuevoProductoPage,
    DetallePage,
    DetalleProductoPage,
    FormularioPage,
    CarritoPage,
    RegistrarUsuarioPage,
    InicioSesionPage,
    DetalleUsuarioPage,
    UsuariosPage,
    ModificarUsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler },
   
    NotesService,
    CarritoProvider,
    ProductosProvider,
    Camera,
    ImagePicker,
    CargaImagenProductoProvider,
    CarroProvider,
    
  ]
})
export class AppModule {}
