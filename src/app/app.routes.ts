import {
  // CanMatch,
  CanMatchFn,
  RedirectCommand,
  // Route,
  Router,
  Routes,
  // UrlSegment
} from "@angular/router";
// import {TasksComponent} from "./tasks/tasks.component";
import {NoTaskComponent} from "./tasks/no-task/no-task.component";
import {
  resolveTitle,
  resolveUserName,
  // UserNameResolver,
  UserTasksComponent
} from "./users/user-tasks/user-tasks.component";
// import {NewTaskComponent} from "./tasks/new-task/new-task.component";
import {NotFoundComponent} from "./tasks/not-found/not-found.component";
import {routes as userRoutes} from "./users/users.routes";
import {inject, Injectable} from "@angular/core";

//új,modern változat
const dummyCanMatch: CanMatchFn = (route, segments) => {
  // ide jön a logika
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5){
    return true
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

// régi módszer
// @Injectable({ providedIn: 'root' })
// class CanMatchTeamSection implements CanMatch {
//   constructor(private router: Router) {}
//   canMatch(route: Route, segments: UrlSegment[]) {
//     const shouldGetAccess = Math.random();
//     if (shouldGetAccess < 0.5) {
//       return true;
//     }
//     return new RedirectCommand(this.router.parseUrl('/unauthorized'));
//   }
// }

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
    title: 'No task selected'
  },
  // {
  //   path: 'tasks', // <your-domain>/tasks
  //   component: TasksComponent
  // },
  // nested routing
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: userRoutes,
    // canMatch: [dummyCanMatch],
    // Amit itt megadok, az lászódni fog input-ként a komponensben
    data: {
      message: 'Hello'
    },
    resolve: {
      userName: resolveUserName
      // userName: UserNameResolver
    },
    title: resolveTitle
    //   [
    //   // ez azt tudja, hogy ha valaki csak siman a parent útvonalat írja be, de nekünk vmelyik child útvonal mindenhová kell,
    //   // vagyis csak siman az alapútvonal nem elég, akkor itt megadhatjuk, hogy ha vki csak a főt adja meg,
    //   // melyik child-re irányítsuk át
    //   {
    //     path: '',
    //     redirectTo: 'tasks',
    //     // prefix: az url eleje ezzel kezdődik-e (mindegy mi jön utána)
    //     // full: ez e a teljes url, nincs utána más
    //     pathMatch: 'prefix'
    //   },
    //   {
    //     path: 'tasks',// <your-domain>/users/<uid>/tasks
    //     component: TasksComponent
    //   },
    //   {
    //     path: 'tasks/new',
    //     component: NewTaskComponent
    //   }
    // ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

