import {Routes} from "@angular/router";
import {resolveTask, TasksComponent} from "../tasks/tasks.component";
import {canLeaveEditPage, NewTaskComponent} from "../tasks/new-task/new-task.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix'
  },
  {
    path: 'tasks',
    component: TasksComponent,
    //csak akkor fut újra, ha a route parameter változik, egyébként nem, tehát hiába nyomunk a rendezés
    //gombra, a queryparaméer változását nem érzékeli
    resolve: {
      userTasks: resolveTask
    },
    // ezel tudjuk szabályozni, mikor fusson újra, így már a queryparam-ot is figyeli
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage]
  }
]
