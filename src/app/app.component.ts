import { Component, ViewChild }   from '@angular/core';
import { Platform, Nav  }         from 'ionic-angular';
import { StatusBar }              from '@ionic-native/status-bar';
import { SplashScreen }           from '@ionic-native/splash-screen';

//PAGINAS
import { ProductosPage }        from '../pages/productos/productos';
import { ClientesPage }         from '../pages/clientes/clientes';
import {FormularioPage}         from '../pages/formulario/formulario';
import {OrdenesPage}              from       "../pages/ordenes/ordenes";
import {InicioSesionPage}                from "../pages/inicio-sesion/inicio-sesion";
import {RegistrarUsuarioPage} from "../pages/registrar-usuario/registrar-usuario";
import {CargaImagenProductoProvider} from "../providers/carga-imagen-producto/carga-imagen-producto"

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('NAV') nav: Nav;
  public rootPage: any;
  public pages: Array<{ titulo: string, component: any, icon: string }>;

  constructor(
    platform:     Platform,
    statusBar:    StatusBar,
    splashScreen: SplashScreen,
    cip:CargaImagenProductoProvider
  ) {

    this.rootPage = InicioSesionPage;
    this.pages = [

      { titulo: 'Inicio',          component: ProductosPage,        icon: 'home'},
      { titulo: 'Clientes',        component: ClientesPage,         icon: 'person-add'},
      { titulo: 'Registrar',       component: RegistrarUsuarioPage, icon: 'person-add'},
      { titulo: 'Ordenes',         component: OrdenesPage,          icon: 'list-box'},
      { titulo: 'Cerrar Sesion',   component: InicioSesionPage,     icon: 'close-circle'},
      
     
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToPage(page){
    this.nav.setRoot(page);
  }

}
