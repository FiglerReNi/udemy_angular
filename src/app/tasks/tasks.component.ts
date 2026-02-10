import { Component } from '@angular/core';
import {NewTaskComponent} from "./new-task/new-task.component";
import {TasksListComponent} from "./tasks-list/tasks-list.component";

// import { NewTaskComponent } from './new-task/new-task.component';
// import { TasksListComponent } from './tasks-list/tasks-list.component';
// import {TasksService} from "./tasks.service";

@Component({
  selector: 'app-tasks',
  // standalone: true,
  standalone: false,
  templateUrl: './tasks.component.html',
  // imports: [NewTaskComponent, TasksListComponent],
  /*Itt is be tudjuk húzni a service-ket, hogy aztán használhassuk őket, így viszont csak ez az adott
  * komponens és a hozzá tartozó child-ek érik el. Ilyenkor csak ezek osztoznak egy példányon, ha máshová is behúzom
  * az új példány lesz. Akkor is új pédány lesz, ha ebből a tasks html-ből kettőt használok egymás alatt az app komponent-
  * ben*/
  // providers: [TasksService]
})
export class TasksComponent {}
