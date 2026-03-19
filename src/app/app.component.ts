import { Component } from '@angular/core';
import { SignalsComponent } from './signals/signals.component';
// import { DefaultComponent } from './default/default.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [SignalsComponent]
    // imports: [DefaultComponent, SignalsComponent]
})
export class AppComponent {}
