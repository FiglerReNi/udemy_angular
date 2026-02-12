import { Component } from '@angular/core';

import { CounterComponent } from './counter/counter.component';
import { MessagesComponent } from './messages/messages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CounterComponent, MessagesComponent],
})
export class AppComponent {
  get debugOutput() {
    console.log('[AppComponent] "debugOutput" binding re-evaluated.');
    return 'AppComponent Component Debug Output';
  }
}

/*Az angular alkalmazás be van csomagolva a zone.js által, ez érzékeli a változásokat, mint user event
* időzítők stb.
* Alapból az angularban a változások lekövetése (change detection) úgy működik, hogy ha a felületen megnyomok egy
* gombot, akkor az összes templatet megnézi és ellenőrzi az angular. Ez sok felesleges hívásnak tűnhet, de elvileg az angular
* jól kezeli és lehet iit-ott optimalizálni.
* Ha megnyomjuk a gombot ráadásul nem egyszer, hanem kétszer látunk minden logot, tehát kétszer van ellenőrzés
* angular által. Ez azért van mert development módban vagyunk. Élesben ilyen nincs. Developon ez viszont
* ellenőrizni tudja, hogy nem történik-e az első változás ellenőrzés után valami nemvárt változás.
* Optimalizálás:
*   a html templaten minél kevesebb bonyolultan lefutó funkciót hívjunk meg
*   a get-ek szintén minél egyszerűbbek legyenek a .ts-be
*   egyes kódrészleteket ki tudunk szedni a zone watch-ból és ott nem fut a change detection
*   onPush strategy
*       - ahol használjuk és a child komponenseken figyel arra, hogy az event érinti-e ezeket a komponenseket
*         és ha nem kiveszi a vizsgálatból
*       - használhatjuk régi módszerrel vagy signal() - al
*       - ha NEM signal()-t használunk egyetlen esetben figyelnünk kell az onPushnál, akkor ha service.ts-t is használunk
*         Az oka, hogy az onPushnál a következő esetekben triggerelődik a change detection:
*               - ha frissül egy input a .ts-ben (ha service-t használunk ez nem lesz valószínűleg)
*               - ha manuálisan triggereljük pl ngZone.run-al
*               - ha van vmilyen event a komponensben vagy a child-ben (pl click stb)
*               - vagy ha signal-t használunk aminek változhat az értéke
*         Ha a fentiek nincsenek, csak mondjuk egy service-ből kiolvasott érték ami a service-ben változik, és csak
*         meg kellene jelennie a komponensben, az nem a másik templatben lévő mentésre, vagy más eventre
*         befrissülni (pl egy lista, amihez hozzáadunk egy elemet)
*         Megoldás:
*             - signal()-t használunk
*             - kézzel befrissítjük azt a komponenst ahol az onPush van, rxjs-el a komponens.ts-be és a servic-
*               be is viszonylag sok kód árán lehet megtenni a .ts-be írt részt html-ben kiválthatjuk az async pipe-al*/

/*A zone.js kikapcsolható, sőt angular 21+ -ban új project esetén ez az alapbeállítás
*     - Amikor signal()-t használunk tulajdonképpen ignoráljuk is a zone.js-t, mert a signal() angular feature
*       és így ennek változásáról mindig értesül az angular, uhyanígy értesül pl a click eventről is és még csomó mindenről,
*       a többi esetben arról értesül, amit a zone.js és a fenti konfigurációk jeleznek neki, de ez a maradék rész nem annyira sok.
*      - A fentiek miatt a zone.js eltávolítható, ha csak event binding-ot és signal()-t használunk, a maradék helyeken
*        pedig kézzel triggereljük a ChangeDetectorRef-el */

