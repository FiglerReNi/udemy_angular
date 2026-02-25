import {Component, inject, Injectable, input} from '@angular/core';
import {UsersService} from "../users.service";
import {
  // ActivatedRoute,
  ActivatedRouteSnapshot,
  // Resolve,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot
} from "@angular/router";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
// export class UserTasksComponent implements OnInit{
export class UserTasksComponent{
  // Útvonalból változó 1. módszer
  // az útvonalból veszi ki a userId-t, kell hozzá az app.config-ba a withComponentInputBinding()
  // userId = input.required<string>()
  // Útvonalból változó 2. módszer
  // @Input({required:true}) userId!: string
  // userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name)
  // Útvonalból változó 3. módszer
  // private activatedRoute = inject(ActivatedRoute);
  // userName = '';

  // private destroyRef = inject(DestroyRef)
  // private usersService = inject(UsersService);

  userName = input.required<string>()
  message = input.required<string>()

  // tartalmazza a resolver értékeket, de uyge az input mezők is elegek hozzá alapból, ez nem feltétlen kell
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: data => {
  //       console.log(data);
  //     }
  //   })
  // }
  // Ez csak egyszer fut le a legelején, de ettől függetlenül a subscribe miatt észleli, ha változik a beérkező param
  // és újrakalkulálja az új id-val (amikor kattintunk a neveken)
  // ngOnInit(): void {
  //   console.log(this.message());
  //   console.log(this.activatedRoute);
  //   console.log(this.activatedRoute.snapshot);
  //   console.log(this.activatedRoute.snapshot.paramMap.get('userId'));
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: paramMap =>
  //       this.userName = this.usersService.users.find(u =>
  //         u.id === paramMap.get('userId'))?.name || '',
  //     })
  //
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe())
  // }
}

export const resolveTitle: ResolveFn<string> = (activatedRoute, routerState) => {
  return resolveUserName(activatedRoute, routerState) + '\'s Tasks'
}

// modern way
export const resolveUserName: ResolveFn<string>  = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  return usersService.users.find(u =>
    u.id === activatedRoute.paramMap.get('userId'))?.name || ''
}

// régenni megoldás
// @Injectable({ providedIn: 'root' })
// export class UserNameResolver implements Resolve<string> {
//   constructor(private usersService: UsersService) {}
//   resolve(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.usersService.users.find(
//       (u) => u.id === activatedRoute.paramMap.get('userId')
//     )?.name || '';
//   }
// }
