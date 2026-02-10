import {Component, computed, inject, signal} from '@angular/core';

import {TaskItemComponent} from './task-item/task-item.component';
import {TasksService} from "../tasks.service";
import {TaskServiceToken} from "../../../main";
import {TASK_STATUS_OPTIONS, TaskStatusOptions, taskStatusOptionsProvider} from "../task.model";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  // nemcsak service-t húzhatunk be dependency injectionnal, hanem értékeket is pl.
  // ezt html elemekben használjuk fel itt
  providers: [taskStatusOptionsProvider]
  // providers: [{
  //   provide: TASK_STATUS_OPTIONS,
  //   useValue: TaskStatusOptions
  // }]
})
export class TasksListComponent {
  // private tasksService = inject(TasksService);
  private tasksService = inject(TaskServiceToken);
  private selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  // tasks = [];
  // tasks = this.tasksService.allTasks;
  // újatölti magától a listát, ha a selectedFilter, vagy az allTasks változik
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'all':
        return this.tasksService.allTasks();
      case 'open':
        return this.tasksService.allTasks().filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService.allTasks().filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService.allTasks().filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
