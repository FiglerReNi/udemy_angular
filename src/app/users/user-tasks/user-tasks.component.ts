import {Component, computed, DestroyRef, inject, Input, input, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";

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
export class UserTasksComponent implements OnInit{
  // Útvonalból változó 1. módszer
  // az útvonalból veszi ki a userId-t, kell hozzá az app.config-ba a withComponentInputBinding()
  // userId = input.required<string>()
  // Útvonalból változó 2. módszer
  // @Input({required:true}) userId!: string
  // userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name)
  // Útvonalból változó 3. módszer
  private activatedRoute = inject(ActivatedRoute);
  userName = '';

  private destroyRef = inject(DestroyRef)
  private usersService = inject(UsersService);

  // Ez csak egyszer fut le a legelején, de ettől függetlenül a subscribe miatt észleli, ha változik a beérkező param
  // és újrakalkulálja az új id-val (amikor kattintunk a neveken)
  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: paramMap =>
        this.userName = this.usersService.users.find(u =>
          u.id === paramMap.get('userId'))?.name || '',
      })

    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
}
