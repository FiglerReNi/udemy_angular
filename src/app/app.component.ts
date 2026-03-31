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
 1) CSR, SSR, SSG röviden
CSR — Client-Side Rendering
Ez a “klasszikus” Angular SPA modell:
a böngésző letölti a HTML-t, JS-t, CSS-t
az Angular a böngészőben építi fel az oldalt
a szerver általában csak a statikus fájlokat adja
Előny:
egyszerűbb üzemeltetés
statikus host is elég lehet
Hátrány:
az első megjelenés lassabb lehet
a böngészőnek több munkát kell végeznie
SEO és előnézet szempontból gyengébb lehet

SSR — Server-Side Rendering
Itt az oldal először a szerveren áll össze, és a böngésző már kész HTML-t kap.
Tehát:
jön a kérés
a szerver lefuttatja az Angular renderelést
visszaad egy kész HTML-t
a böngésző ezt mutatja meg
utána Angular “feléleszti” az oldalt a kliensen
Előny:
gyorsabb első tartalom
jobb SEO
jobb “első benyomás”
Hátrány:
kell egy futó szerveroldali környezet
bonyolultabb deploy
a szervernek tudnia kell renderelni az Angular appot

SSG — Static Site Generation / Prerender
Ez olyan, mint az SSR “előre legyártott” változata.
Itt a HTML:
build időben készül el
nem minden kérésnél újra
a generált statikus oldalakat a szerver csak kiszolgálja
Előny:
nagyon gyors
statikus hoston is jól mehet
SEO-barát
Hátrány:
ami adat változik, az csak új build után frissül
nem ideális nagyon dinamikus tartalomra

2) Mikor kell SSR vagy SSG?
Akkor hasznos, ha:
fontos az első betöltés gyorsasága
fontos a SEO
fontos, hogy a felhasználó azonnal lásson tartalmat
nyilvános oldalt építesz
Akkor kevésbé fontos, ha:
belső admin felület
login mögötti alkalmazás
SEO nem számít
minden amúgy is API-ból jön és az első festés kevésbé kritikus

3) Mit jelent az, hogy “ha van HTTP hívás, akkor SSR/SSG jöhet szóba”?
Ez nem azt jelenti, hogy CSR-ben nem lehet HTTP hívás.
Dehogynem lehet.
A különbség az, hogy:
CSR-ben a HTTP hívás a böngészőből fut
SSR-ben a szerver is megpróbálhat adatot kérni, és már a kész oldalt küldi vissza
SSG-ben az adatot build időben beépíted az oldalba
Tehát HTTP hívás nem tiltja a CSR-t. Csak az a kérdés, hol és mikor fut az adatlekérés.

4) Mi az a Node.js-es server.ts?
Az Angular SSR-es projektben a server.ts általában egy Node-alapú szerver:
Express-szel vagy hasonlóval fut
ő fogadja a requestet
ő rendereli az Angular oldalt szerveren
ő adja vissza a kész HTML-t
Ez azért kell, mert a böngésző helyett a szervernek kell tudni “Angular módon” renderelni.

5) És akkor mi van, ha Java backend van WildFly-on?
Na itt jön a lényeg: a frontend renderelése és a backend API nem ugyanaz a dolog.
Tipikus felállások
A) Angular CSR + Java backend WildFly-on
Ez a leggyakoribb és legkézenfekvőbb.
Angular SPA a frontend
WildFly-on fut a Java backend
Angular a böngészőben fut
a backend REST API-t ad
Ez nagyon jól működik, és sok rendszerben ez az alap.
Mikor jó?
webalkalmazás
admin felület
üzleti app
nincs erős SEO igény

B) Angular SSR + Java backend WildFly-on
Ez is lehetséges, csak a frontendhez kell még egy SSR-képes Node szolgáltatás.
Ilyenkor:
a Java backend marad WildFly-on
az Angular SSR-t külön Node szerver rendereli
a két rendszer együtt dolgozik
Ez azt jelenti, hogy a WildFly nem helyettesíti az SSR szervert.
A WildFly a backend API-ra jó, az SSR-hez pedig külön Node renderelő réteg kell.
Mikor jó?
nyilvános weboldal
fontos a gyors első render
SEO is számít

C) Angular SSG/prerender + Java backend WildFly-on
Itt az Angular oldalak build időben elkészülnek, és statikusan kiszolgálhatók.
A Java backend:
továbbra is API-t ad
az Angular frontend pedig kész HTML-ként lehet deployolva
Ez gyakran egyszerűbb, mint az SSR, ha a tartalom nem túl dinamikus.
Mikor jó?
marketing oldal
dokumentáció
blog
sok statikus, kevéssé változó oldal

6) Akkor WildFly mellett mit válasszak?
Ha egy “klasszikus” üzleti appod van:
CSR + Java backend
Ez a legegyszerűbb és legtöbbször elég.
Ha SEO és első betöltés fontos:
SSR vagy SSG
De ekkor az Angular rendereléshez külön Node-alapú réteg kellhet.
Ha a tartalom ritkán változik:
SSG/prerender
Ez sokszor jó kompromisszum.

7) Fontos tisztázás
A Java backend és az Angular SSR nem ugyanazon a futtatókörnyezeten fut.
WildFly = Java backend runtime
Angular SSR = Node.js környezet
Tehát ha SSR-t akarsz, az Angular oldalt általában Node-alapon kell renderelni, akkor is, ha a backend Java.

8) Egyszerű döntési szabály
Válaszd a CSR-t, ha:
SPA-t építesz
nincs SEO-igény
a backend amúgy is külön API
Válaszd az SSR-t, ha:
fontos a gyors első betöltés
fontos a keresőoptimalizálás
dinamikus, de azonnal látható tartalom kell
Válaszd az SSG-t, ha:
inkább statikus vagy ritkán frissülő tartalom van
szeretnél gyors oldalt
nem kell minden requestre új render

Rövid összefoglaló
CSR: böngésző renderel
SSR: szerver renderel requestenként
SSG: előre legenerált HTML
WildFly + Java backend mellett a CSR a legtermészetesebb
SSR/SSG is mehet, de a frontend rendereléshez általában külön Node réteg kell
Ha szeretnéd, a következő üzenetben le tudom rajzolni neked ezt egy konkrét architektúra-ábrával:
Angular CSR + WildFly
Angular SSR + WildFly
Angular SSG + WildFly
és így rögtön átlátható lesz, melyik hol fut.*/
