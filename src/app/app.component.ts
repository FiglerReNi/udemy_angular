import { Component } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [WelcomeComponent, RouterModule],
  standalone: true,
  // standalone: false,
})
export class AppComponent {}
