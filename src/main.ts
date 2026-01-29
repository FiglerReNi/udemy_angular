// import { bootstrapApplication } from '@angular/platform-browser';
// bootstrapApplication(AppComponent).catch((err) => console.error(err));
import { AppComponent } from './app/app.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppComponent);
