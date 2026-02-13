import {Component, OnInit, inject, DestroyRef, signal, effect, computed} from '@angular/core';
import {interval, map, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
// export class AppComponent {
  // OBSERVABLE
  // private destroyRef = inject(DestroyRef);
  // ngOnInit(): void {
    // 1000-ms-enként generál egy számot, erre feliratkozunk a subscribe-al és így tudjuk használni,
    // megjeleníteni ezeket a számokat, observert hoz létre
    // const subscription = interval(1000).subscribe({
    //   next: (val) => console.log(val),
    // });
  //   const subscription = interval(1000).pipe(
  //     map((val) => val * 2)
  //   ).subscribe({
  //     next: (val) => console.log(val),
  //   });
  //   this.destroyRef.onDestroy(() => {
  //       subscription.unsubscribe();
  //     }
  //   )
  // }

  //CUSTOM OBSERVABLE
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      subscriber.error('');
      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...');
      subscriber.next({message: 'New value'});
      timesExecuted++;
    }, 2000);
  });

  ngOnInit(): void {
    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Completed!'),
      error: (err) => console.log(err)
    });
  }

  // SIGNAL
  // clickCount = signal(0);
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
  // constructor(){
  //   effect(() => {
  //     console.log(`Clicked button ${this.clickCount()} times.`);
  //   });
  // }
  // ngOnInit() {
  //   // ez mindig el fog indulni, akkor is ha semmi nem használja az értéket
  //   setInterval(() => {
  //     this.interval.update((prevIntervalNumber) => prevIntervalNumber + 1);
  //   }, 1000);
  // }
  // onClick(){
  //   this.clickCount.update((prevCount) => prevCount + 1)
  // }

}

/*Observable: value of over time (stream)
*  - RxJS: https://rxjs.dev/
*  - RxJS library-ba tartozik, ami nem az Angular része, de használjuk az angularral szoros együttműködésben.
*  - Az Observer-ek objectek, amelyek stream-et hoznak létre az adatokból és ezeket kezelik is
* Operators
*  - ezekkel kezelhetjük az Observable value-kat
*  - .pipe -ban konfigurálhatjuk mit akarunk
* Subscripe
*   - ezzel váltjuk ki hogy pl. egy automatikus function, ami observable-t hoz létre elinduljon, ezzel iratkozunk fel
*     a keletkező értékekre, hogy utána dolgozhassunk velük
* Használat:
*   - akkor jó, ha streamre van szükségünk, adatfolyamra és ol. az adatok async módon folyamatosan jöhetnek stb*/
/*Signals: values in container
*   bármikor olvasható a tartalma, nem kell a feliratkozás, subscription, és bármikor módosítható is
* Használat: akkor jó ha egyszer vhol inicializáljuk az értékét és később változtatni akarjuk*/

