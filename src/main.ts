import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
// import {LoggingService} from "./app/logging.service";
import {TasksService} from "./app/tasks/tasks.service";
import {InjectionToken} from "@angular/core";

export const TaskServiceToken = new InjectionToken<TasksService>('tasks-service-token');
  /*itt beregisztrálni a service-ket azért nem annyira jó, mert itt csak root-ként lehet, azaz minden komponens
  * el fogja érni és pluszban az első lépésekben felépíti az angular, a kezdetektől fogva él.
  * Viszont sok esetben kisebb körben van csak rá szükség, vagy nem kell rögtön az alkalmazás indulásától.
  * Ezért inkább a @Injectable-t használjuk*/
bootstrapApplication(AppComponent,
  /*Ilyenkor angular létrehoz ennek egy saját tokent, ami az osztály neve lesz, ezért tudjuk a .ts file-okban az injetc(<ide valójában
  a token jön, ami nekünk most a név>)-ben ezt a nevet használni*/
  // {providers: [TasksService]}
  // ebben az esetben ezt a TaskServiceToken nevet kell használnunk ahol be akarjuk húzni a incejt()-el
  {providers: [{provide: TaskServiceToken, useClass: TasksService}]}
  // {providers: [LoggingService]}
).catch((err) => console.error(err));
