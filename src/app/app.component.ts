import { Component, ViewChild }   from '@angular/core';
import { Platform, Nav  }         from 'ionic-angular';
import { StatusBar }              from '@ionic-native/status-bar';
import { SplashScreen }           from '@ionic-native/splash-screen';

import { HomePage }             from '../pages/home/home';
import { ProductosPage }        from '../pages/productos/productos';
import { ClientesPage }         from '../pages/clientes/clientes';
import { PedidosPage }          from '../pages/pedidos/pedidos';
import { VendedoresPage }       from '../pages/vendedores/vendedores';
import { SignInPage }           from '../pages/signin/signin';
import { SignUpPage }           from '../pages/signup/signup';
import {RegistrarPage}          from '../pages/registrar/registrar';
import {FormularioPage}         from '../pages/formulario/formulario';

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
    splashScreen: SplashScreen
  ) {

    this.rootPage = FormularioPage;
    this.pages = [
      
      { titulo: 'Inicio',          component: HomePage,      icon: 'home'},
      { titulo: 'Productos',       component: ProductosPage, icon: 'cart'},
      { titulo: 'Clientes',        component: ClientesPage,  icon: 'person-add'},
      { titulo: 'Pedidos',         component: PedidosPage,   icon: 'list-box'},
      { titulo: 'Registrar',       component: SignUpPage,  icon: 'list-box'}
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
