import { Component } from '@angular/core';

@Component({
  /*element selector*/
  // selector: 'app-button',
  /*attribute selector: ezzel létrehozzuk és ez egy saját attributum lesz. Ezt akkor használjuk,
  * ha beépített angular elemet akarunk kiterjeszteni, plusz tulajdonságot adni neki*/
  // selector: '[appButton]',
  /*Azt is megadhatom, hogy melyik elemnek legyen ilyen attribútuma. Ez íyy azt jelenti,
  * hogy minden butten elementnek lesz appButton tulajdonsága*/
  selector: 'button[appButton], a[appButton]',
  /*megadhatunk itt egy css osztályt is, hogy minden button ilyen kinézetű legyen pl.*/
  // selector: 'button.button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {


}
