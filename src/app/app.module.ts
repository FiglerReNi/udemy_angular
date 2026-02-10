import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TaskItemComponent } from './tasks/tasks-list/task-item/task-item.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { TasksService } from './tasks/tasks.service';

export const TasksServiceToken = new InjectionToken<TasksService>(
  'tasks-service-token'
);

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TasksListComponent,
    TaskItemComponent,
    NewTaskComponent,
  ],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
  //modulos szerkezetnél ide rakjuk ami korábban a main.ts-ben volt
  providers: [{ provide: TasksServiceToken, useClass: TasksService }],
})
export class AppModule {}
