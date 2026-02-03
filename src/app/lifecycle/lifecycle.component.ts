import {
  Component,
  Input,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css',
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() text?: string;

  constructor() {
    console.log('CONSTRUCTOR');
    console.log(this.text);
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log(this.text);
  }

  // akkor fut le, ha változik a @Input értéke
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    console.log(changes);
  }

  // akkor fut ha az egész alkalmazásban vhol van változás és UI update kell, tehát sokszor lefut, ezért
  // csak nagyon kivételes esetben használjuk
  ngDoCheck() {
    console.log('ngDoCheck');
  }

  /*view az kb a html template-et jelenti és amúgy a contetet is tartalmazza, a content pedig a
  beágyazott ng-content tartalmakra vonatkozik */
  ngAfterContentInit() {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
