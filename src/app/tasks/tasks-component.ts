import {Component, Input} from '@angular/core';
import {TaskComponent} from './task/task-component';
import {NewTaskComponent} from './new-task/new-task-component';
import {type NewTaskData} from './new-task/new-task.model';
import {TasksService} from './tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks-component.html',
  styleUrl: './tasks-component.css'
})
export class TasksComponent {
  // @Input() name: string | undefined;
  @Input({required: true}) name!: string;
  @Input({required: true}) userId!: string;
  isAddingTask = false;
  //ez azért nem jó, mert a service egy közös file, amiben van adat, viszont ha minden komponensben újat hozok létre,
  //nem fogják látni egymás változtatásait.
  //Ezért csak egy példány kellene --> dependency injection angularban a konstruktoron keresztül
  // private tasksService = new TasksService();
  // private tasksService: TasksService;
  //automatikusan lefut a konstruktor
  // constructor(tasksService: TasksService){
  //   this.tasksService = tasksService;
  // }
  //ha elé tesszük a privatot létrehozza a változót is erre a file-ra és nem kell külön nekünk
  constructor(private tasksService: TasksService){
  }
  // @Input({required: true}) name!: string;
  // tasks = [
  //   {
  //     id: 't1',
  //     userId: 'u1',
  //     title: 'Master Angular',
  //     summary: 'Learn all the basic and advanced features of Angular & how to apply them.',
  //     dueDate: '2025-12-31',
  //   },
  //   {
  //     id: 't2',
  //     userId: 'u3',
  //     title: 'Build first prototype',
  //     summary: 'Build a first prototype of the online shop website',
  //     dueDate: '2024-05-31',
  //   },
  //   {
  //     id: 't3',
  //     userId: 'u3',
  //     title: 'Prepare issue template',
  //     summary: 'Prepare and describe an issue template which will help with project management',
  //     dueDate: '2024-06-15',
  //   },
  // ];

  get selectedUserTasks() {
    // return this.tasks.filter(task => task.userId === this.userId)
    return this.tasksService.getUserTasks(this.userId);
  }

  // onCompleteTask(id: string) {
  //   // this.tasks = this.tasks.filter(task => task.id !== id)
  //   this.tasksService.removeTask(id);
  // }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask(){
    this.isAddingTask = false
  }

  // onAddTask(taskData: NewTaskData) {
  //   this.tasksService.addTask(taskData, this.userId)
  //   // this.tasks.unshift({
  //   //   id: new Date().getTime().toString(),
  //   //   userId: this.userId,
  //   //   title: taskData.title,
  //   //   summary: taskData.summary,
  //   //   dueDate: taskData.date,
  //   // })
  //   // this.isAddingTask = false;
  // }
}
