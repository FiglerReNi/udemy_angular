import { Component } from '@angular/core';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  imports: [DetailsComponent],
  // standalone: false,
  standalone: true,
})
export class WelcomeComponent {}
