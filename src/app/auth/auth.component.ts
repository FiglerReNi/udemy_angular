import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import {LogDirective} from "../log.directive";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  // ha az egész auth-ra akarom hogy érvényes legyen hogy minden kattintásnál logoljon, akkor nem kell
  // egyeséel az elemekhez adni a selectort, hanem elég ide behúzni
  hostDirectives: [LogDirective]
})
export class AuthComponent {
  email = signal('');
  password = signal('');
  private authService = inject(AuthService);

  onSubmit() {
    this.authService.authenticate(this.email(), this.password());
  }
}
