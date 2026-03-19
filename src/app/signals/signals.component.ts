import { NgFor } from '@angular/common';
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2 )

  constructor() {
    // akkor fut le, ha a benne használt signal értéke változik
    effect(() => console.log(this.counter()));
  }

  increment() {
    // this.counter.set(5);
    this.counter.set(this.counter() + 1);
    // this.counter.update((oldCounter) => oldCounter + 1);
    this.actions.update((oldAction) => [...oldAction, 'INCREMENT']);
  }

  decrement() {
    this.counter.update((oldCounter) => oldCounter - 1);
    this.actions.update((oldAction) => [...oldAction, 'DECREMENT']);
  }
}
