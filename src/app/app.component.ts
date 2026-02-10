import { Component } from '@angular/core';

import { TasksComponent } from './tasks/tasks.component';
import {LoggingService} from "./logging.service";

@Component({
  selector: 'app-root',
  // standalone: true,
  standalone: false,
  templateUrl: './app.component.html',
  // imports: [TasksComponent],
  /*ha azt szeretnénk hogy service használjon servoce-t az ezzel a komponenshez kötött dologgal nem fog működni,
  * mert csak komponens részek és child-ek látják, de a service.ts-ek nem a komponensek részei, hiába lesznek
  * létrehozva adott csoport alatt. Ezt itt elementInjectornak hívjuk, mert a DOM-hoz kötött a komponens
  * révén, de a serviceknek nincs közük a DOM-hoz.*/
  // providers: [LoggingService]
})
export class AppComponent {}
