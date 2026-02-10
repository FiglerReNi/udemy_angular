import {inject, Injectable, signal} from "@angular/core";
import {Task, TaskStatus} from "./task.model";
import {LoggingService} from "../logging.service";

// Ezzel regisztráljuk be az angularba a service-ünket, hogy aztán be lehessen húzni máshová, ehelyett a
// main.ts-be is regisztrálhatjuk
@Injectable({
  /*Ez azt jelenti hová húzhatom be, a root esetében bármelyik projekt komponensbe*/
  providedIn: 'root'
})
export class TasksService {
  // ha így hagyjuk akkor a megjelenítőben (list) is lehetne elméletileg módosítani, mert ez egy
  // writeable signal, de ezt nem akarjuk hagyni csak a new Task-ben, ahol újat hozunk létre
  // tasks = signal<Task[]>([]);
  // a private miatt csak ebben a template-ben használható, ahové injectáljuk a service-t ott nem
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);
  // ez meghívható kívülről, de nem írható csak olvasható (kb mint egy getter)
  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string, description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN'
    }
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('Added task with title: ' + taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus){
    this.tasks.update((oldTasks) => oldTasks.map((task) => task.id === taskId ? {...task, status: newStatus} : task));
    this.loggingService.log('Change task status to: ' + newStatus);
  }

}
