import {ResolveFn, Routes} from '@angular/router';

import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';
import { NewTaskComponent, canLeaveEditPage } from '../tasks/new-task/new-task.component';
import {TasksService} from "../tasks/tasks.service";
// import {Task} from "../tasks/task/task.model";
// import {inject} from "@angular/core";
// import {TasksService} from "../tasks/tasks.service";

// ha csak az ehhez tartozó útvonalat akarjuk lazy-lodinggal működtetni, át kell ide hozni, különben a fenti
// import miatt így is buildelődne az elején az útvonal, de ha kívülről az app.routes-ből tesszük az egész
// file-t lazy-lodinggá, akkor ezt itt behúzhatjuk importtal
// const resolveUserTasks: ResolveFn<Task[]> = (
//   activatedRouteSnapshot,
//   routerState
// ) => {
//   const order = activatedRouteSnapshot.queryParams['order'];
//   const tasksService = inject(TasksService);
//   const tasks = tasksService
//   .allTasks()
//   .filter(
//     (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
//   );
//   if (order && order === 'asc') {
//     tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
//   } else {
//     tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
//   }
//   return tasks.length ? tasks : [];
// };

export const routes: Routes = [
  {
    //ezzel megadhajuk, hogy az össze ebben a file-ban a children alatt lévő útvonal elérje a servoice-t
    path: '',
    providers: [TasksService],
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
        // lazy-loading miatt, ha csak ezt az egyet akarjuk ebből a file-ból:
        // loadComponent: () => import('../tasks/tasks.component').then(mod => mod.TasksComponent),
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
      },
    ]
  }
];
