import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './app/store/counter.reducer';

bootstrapApplication(AppComponent, {
    providers: [provideStore({counter: counterReducer})]
});

/* Ha használjuk az ngrx-et az első lépés, hogy telepítéskor (ez egy külső library) létrehoz magának egy üres store-t.
* Később ebbe tudunk értéket tenni és onnan kivenni és az értékek változását is kezeli.
* component <- selector <- store : kifelé irány
* store <- reducer <- action <- component: befelé irány*/
