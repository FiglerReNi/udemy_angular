import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './app/store/counter.reducer';
import { provideEffects } from '@ngrx/effects';
import { CounterEffects } from './app/store/counter.effects';

bootstrapApplication(AppComponent, {
    providers: [provideStore({ counter: counterReducer }), provideEffects([CounterEffects])]
});

/* Ha használjuk az ngrx-et az első lépés, hogy telepítéskor (ez egy külső library) létrehoz magának egy üres store-t.
* Később ebbe tudunk értéket tenni és onnan kivenni és az értékek változását is kezeli.
* component <- selector <- store : kifelé irány
* store <- reducer <- action <- component: befelé irány*/
/*a service.ts-t válthatjuk ki vele*/
/*
Ha beegisztráluk az ngrx-et akkor kell egy reducer, ami a háttérben lévő storhoz hozzáfér és ezen keresztül tudunk bepakolni
értékeket a store-ba. Értékenként új reducer kell, és be kell regisztrálni a main-be provider-ként valamilyen néven.
Adatot kivenni a reducer select metódusával tudunk, a main-ben megadott néven tudjuk a reducert meghívni és importálni
Az action-ban tudnk a service-hez hasonló függvényeket megadni, ami a tényleges adatváltoztatást végzi.
Az action-t bele kell rakni a reducer-be, hogy minden értékváltozásról értesüljön, és így minden helyen ahol használjuk a reducert a
selectel a legújabb friss adatot tudjuk használni.
A selec Observable-t ad vissza amire fel tudunk iratkozni a .html file-okban és így ezek a helyek is egyből lefrissülnek és
up to datek lesznek
 */
/*
Effects:
side effect-nek hívjuk az olyan eseményeket, amelyek nem közvetlenül a ui-t frissítik. Például a logírás,
egy http request, vagy locakStorage-be írás. Ezeket nem írhatjuk a reducer-be, azok synchronous működésűek, egyszerűen
és tisztán kell tartanunk őket.
-> az ngrx-ben ezt oldjuk meg az effects-el
-> telepíteni kell ng add @ngrx/effects
*/
