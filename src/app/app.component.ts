import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, UsersComponent, RouterOutlet],
})
export class AppComponent {}


//deploy-ra készítés: ng build (ez optimalizál is, mert amit localban használunk az nagyon sok plusz logot stb.
//tartalmaz, ami prodra nem kell)
//    - átkonvertálja  a typscriptet a javascriptre
//    - optimalizálja a kódot
//    - minél kisebb méretet hoz létre
//Létrehoz egy dist foldert, és ebben lesznek a file-ok, amiket deployolni szeretnénk

/*Build lehetőségek
    CSR - a browser állítja össze az oldalt.
      SAP (single page application), ez egy client-side-only alkalmazás: nincs hozzá külön backend, hanem
      csak ts és js kódok. Minden kódot a böngésző hajt végre --> static host elég hozzá.
      Hátrány: lassabban töltődik be az oldal, mert lassú a böngésző; vagy egyes részei töltődnek később.
      Nagyon pici és egyszerű oldalakhoz jó
      Static web host pl: FireBase https://firebase.google.com/docs/hosting
        npm install -g firebase-tools
        firebase login
        firebase init
        firebase deploy
      Ng-deploy: ez támogat néhány host-ot pl a firebase-t is így ezzel is deployolhatunk oda
        ng add @angular/fire - ha pl. firebase-el akarjuk használni
        ng deploy
      https://angular.dev/tools/cli/deployment
   SSR - server-side-rendered app: ebben az esetben szerver oldalon áll össze a kért oldal és amikor kész
      akkor kapja meg a böngésző. Dinamikus web server kell hozzá, előnye hogy így a már teljesen kész oldal jelenik meg.
      Lassabb lehet pl. adat kikérés miatt stb.
      ng add @angular/ssr -- az ng add különféle kiegészítőket tud adni a projektünkhöz
      https://angular.dev/best-practices/performance/ssr
      a server.ts file-al fog tudni szerver oldalon futni, amiben node.js van
      egy web host fog kelleni, ahová ki tudjuk tenni
      npm run build
      local futtatás szerver oldali megközelítéssel: npm run serve:ssr:routing
      angular.json "server" alá "outputMode":"server"
  SSG - static site generation: a kettő ötvözete, gyorsabb lehet, ehhez is dinamikus web szerver kell.
      hátránya, hogy ameddig nem buildelődik le a háttérben az új adatokkal az oldal addig a régi adatokat figjuk látni
      ng add @angular/ssr
      Az angular maga is megpróbálja a statikus oldalakat automatikusan előkészíteni, pl. amelyiknek az út-
      vonalában nincs dinamikus változó. Ilyet egy .txt fileban mi is definiálhatunk, hogy mik azok amik
      előre elkészülhetnek. Az angular 20-tól felfelé ilyen txt-s lehetőség már nincs
      angular.json, az outputMode:"server" nem kell és helyére a "prerender": "routersFile: kell
      https://firebase.google.com/docs/app-hosting
 */
