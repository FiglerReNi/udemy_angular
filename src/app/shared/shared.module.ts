import {NgModule} from '@angular/core';
import {CardComponent} from './card/card-component';

@NgModule({
  declarations: [CardComponent],
  /*amiket külső modulokban használni akarunk*/
  exports: [CardComponent]
  }
)
export class SharedModule { }
