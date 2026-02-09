import { Component } from '@angular/core';
import {DatePipe, DecimalPipe} from "@angular/common";
import {TemperaturePipe} from "./temperature.pipe";
import {SortPipe} from "./sort.pipe";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    DatePipe,
    // DecimalPipe,
    TemperaturePipe,
    SortPipe
  ]
})
export class AppComponent {
  currentDate = new Date();
  currentTemperatures = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];

  constructor() {
    this.historicTemperatures.sort( (a, b) => a > b ? 1 : -1);
  }

  onReset(index: number) {
    /*Itt az index aszerint jön vissza, hogy mire kattintunk a kijelzőn, ami a visszakapott sorted tömb,
    * tehát ha a másoik elemre kattintok, ami a 33-as akkor visszajön az index = 1, a sorted tömb szerint.*/
    // console.log(index);
    // this.historicTemperatures[index] = 18;
    /* Mivel az eredeti tömb a historicTemperatures változatlan maradt, mert úgy másoltuk a sorted-ot, hogy
    * új referebnciája lett, ezért a this.historicTemperatures[index] a 37-esre fog vonatkozni és console.log-al látszik is, hogy
    * lecseréli a kód a 37-et 18-ra. Viszont felületen a sorted tömb jelenik meg, amire ez nincs hatással, ezért
    * látszólag nem történik semmi, hiszen a sorted nem hívódik meg újram mert ez a változás nem triggeleri*/
    // console.log(this.historicTemperatures);

    /*Ebben az esetben már fog látszódni a felületen, mert a newTemp egy új referenciával fog rendelkezni,
    * ahol átírjuk a megfelelő értéket a 18-ra, majd ezt az újat visszarakjuk a historicTemperatures-be, de úgy, hogy a
    * newTemp referenciája kerüljön bele. Ezt már változásnak érzékeli a pipe, mert nem cak az eredeti tömbben (referencián belül) változott
    * valami, hanem az egész tömb új referenciát kapott és ez már tudja triggerelni a sorted pipe-ot.*/
    // const newTemp = [...this.historicTemperatures];
    // newTemp[index] = 18;
    // this.historicTemperatures = newTemp;

    /*A másik megoldás, hogy a pipe-unk konfigján változtatunk, hogy újra lefusson, amikor nekünk kell, de ez performancia szempontból
    nem jó megoldás, ilyen esetben jobb nem pipe-ot használni.*/
    this.historicTemperatures[index] = 18;
  }
}
