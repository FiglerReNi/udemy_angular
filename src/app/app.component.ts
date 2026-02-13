import {Component, OnInit, inject, DestroyRef, signal, effect, computed} from '@angular/core';
import {interval, map, Subscription} from 'rxjs';
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
/* export class AppComponent1 implements OnInit {
  //SIGNAl -> OBSERVABLE CONVERT Variable
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  // interval = signal(0);
  destroyRef = inject(DestroyRef);

  constructor(){
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`);
    // });
  }
  ngOnInit() {
    // ez mindig el fog indulni, akkor is ha semmi nem használja az értéket
    // setInterval(() => {
    //   this.interval.update((prevIntervalNumber) => prevIntervalNumber + 1);
    // }, 1000);
    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times.`)
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
  onClick(){
    this.clickCount.update((prevCount) => prevCount + 1)
  }
}*/

export class AppComponent implements OnInit {
  //OBSERVABLE  -> SIGNAl CONVERT Variable
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  // intervalSignal = toSignal(this.interval$);
  intervalSignal = toSignal(this.interval$, {initialValue: 0});
  destroyRef = inject(DestroyRef);

  constructor(){
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`);
    // });
  }
  ngOnInit() {
    // ez mindig el fog indulni, akkor is ha semmi nem használja az értéket
    // setInterval(() => {
    //   this.interval.update((prevIntervalNumber) => prevIntervalNumber + 1);
    // }, 1000);
    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times.`)
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
  onClick(){
    this.clickCount.update((prevCount) => prevCount + 1)
  }
}

/*Observable: value of over time (stream)
*  - RxJS: https://rxjs.dev/
*  - RxJS library-ba tartozik, ami nem az Angular része, de használjuk az angularral szoros együttműködésben.
*  - Az Observer-ek objectek, amelyek stream-et hoznak létre az adatokból és ezeket kezelik is
*  - Nincs initial value kötelezőség
* Operators
*  - ezekkel kezelhetjük az Observable value-kat
*  - .pipe -ban konfigurálhatjuk mit akarunk
* Subscripe
*   - ezzel váltjuk ki hogy pl. egy automatikus function, ami observable-t hoz létre elinduljon, ezzel iratkozunk fel
*     a keletkező értékekre, hogy utána dolgozhassunk velük
* Használat:
*   - akkor jó, ha streamre van szükségünk, adatfolyamra és ol. az adatok async módon folyamatosan jöhetnek stb*/

/*Signals: values in container
*   - bármikor olvasható a tartalma, nem kell a feliratkozás, subscription, és bármikor módosítható is
*   - mindig van initial value
* Használat: akkor jó ha egyszer vhol inicializáljuk az értékét és később változtatni akarjuk*/

/*Konvertálás
*   OBSERVABLE -> SIGNAl CONVERT Variable
*       interval$ = interval(1000);
*       intervalSignal = toSignal(this.interval$, {initialValue: 0});
*   SIGNAl -> OBSERVABLE CONVERT Variable
*       clickCount = signal(0);
*       clickCount$ = toObservable(this.clickCount);*/
