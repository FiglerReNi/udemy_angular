import {ChangeDetectionStrategy, Component, inject, NgZone, OnInit, signal} from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit{
  private zone = inject(NgZone);
  count = signal(0);

  ngOnInit() {
    setTimeout(() => {this.count.set(0)} , 4000);
    // ez egy olyan eset amikor nem kellene lefutnia a change detection-nek, mert nem változatat ez az
    // időzítő semmin sehol, csak logot ír ki, de a zone.js az időzítő lejártát eseménynek érzékeli, és szól
    // az angulárnak, hogy végezze újra az ellenőrzést és ezért ez után a kód után újra fut.
    setTimeout(() => {console.log('Timer expired!')} , 5000);
    // ezzel ki lehet kapcsolni erre a kódra, hogy a zone.js figyelje
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {console.log('Timer expired!')} , 5000);
    })

  }
  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
