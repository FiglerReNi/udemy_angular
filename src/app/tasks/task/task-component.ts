import {Component, EventEmitter, Input, Output} from '@angular/core';
import {type Task} from './task.model';
import {CardComponent} from '../../shared/card/card-component';
import {DatePipe} from '@angular/common';
import {TasksService} from '../tasks.service';
// import { Task } from './task.model';

// interface Task {
//   id: string,
//   userId: string,
//   title: string,
//   summary: string,
//   dueDate: string,
// }

@Component({
  selector: 'app-task',
  imports: [
    CardComponent, DatePipe
  ],
  templateUrl: './task-component.html',
  styleUrl: './task-component.css'
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  // @Output() complete = new EventEmitter<string>();

  constructor(private tasksService: TasksService) {
  }

  onCompleteTask() {
    this.tasksService.removeTask(this.task.id);
  }

}
