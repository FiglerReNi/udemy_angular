import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit, AfterViewInit {
  // currentStatus = 'offline';
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';

  constructor() {
    /*akkor fut amikor létrejön a komponens példánya az egyik legelső lépés. Olyat rajókunk ebbe, ami nem függ
    elemektől, pl input stb, alap mezők beállítása lehet itt
     Az ngOnInit akkor fut amikor befejezte a példányosítást, a konstruktor után azonnal, ilyenkor már
     be vannak állítva az értékek pl Input() stb. Ez az inicializálás eleje, itt már lehet pl api hívás, timer
     @Input-ra épülő logika, mert itt már be van állítva, konstruktorban bizonytalan
     Az ngOnChanges ha az @Input változhat is akkor ezt használjuk*/
    // https://angular.dev/guide/components/lifecycle
    // setInterval(() => {
    //   const rnd = Math.random(); // 0 - 0.99999
    //   if(rnd < 0.5) {
    //     this.currentStatus = 'online';
    //   } else if (rnd < 0.9) {
    //     this.currentStatus = 'offline';
    //   } else {
    //     this.currentStatus = 'unknown';
    //   }
    // }, 5000);
  }

  ngOnInit(): void {
    console.log('on init');
    setInterval(() => {
      const rnd = Math.random(); // 0 - 0.99999
      if(rnd < 0.5) {
        this.currentStatus = 'online';
      } else if (rnd < 0.9) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 5000);
  }

  ngAfterViewInit(): void {
    console.log('after view init');
  }


}
