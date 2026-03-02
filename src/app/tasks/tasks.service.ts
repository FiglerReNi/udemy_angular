import {afterNextRender, Injectable, signal} from '@angular/core';

import { type NewTaskData } from './task/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal([
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]);

  allTasks = this.tasks.asReadonly();

  constructor() {
    // ez itt azért fog kelleni, mert ha szerver oldalon futtatjuk az appunk akkor a locale storage nem lesz elérhető,
    // mert az browser tulajdonság. Így amikor épül fel az oldal szerveroldalon, hibát tob mert nem találja.
    // Ha ezt a részt renderelés után futtatjuk, akkor a frontendbn már mrg fogja találni a locale storage-ot.
    afterNextRender(() => {
      // ez így nem lesz tökéletes, mert a resolverUser csak egyszer fut és nem lesz mindig szinkronban a dummy user és a local storage, ezért
      // ilyet nem igazán csinálunk, hanem az ada is szerver oldalról jön általában, vagy ha localStorage kell, akkor a resolverUser-es megoldást nem lehet használni.
      const tasks = localStorage.getItem('tasks');

      if (tasks) {
        this.tasks.set(JSON.parse(tasks));
      }
    })
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.update((prevTasks) => [
      {
        id: new Date().getTime().toString(),
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...prevTasks,
    ]);
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks.update((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
