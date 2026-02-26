import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, UsersComponent, RouterOutlet],
})
export class AppComponent {}


/* Lazy loading:
*   Csak azt töltjük be, amire adott oldalon szükség van és nem az egész Angular alkalmazást az indtításkor. Ez performancia,
*   betöltés gyorsaság szempontjából számít.
*   Fajtái:
*     route based lazy loading: azokra az útvonalakra alkalmazható, amelyek nem kellenek az első oldalhoz, hanem pl
*                               egy gombra kattintással használjuk az útvonalat és a hozzá artozó komponenst.
*         - egy úvonalra
*         - összes children útvonalra amik külön file-ban vannak
*         - servicekre (pl. taskService, amire betöltéskor nincsen szükség, ráérne később buildelni)
*   deferrable views*/
