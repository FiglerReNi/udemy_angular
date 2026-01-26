import {NgModule} from '@angular/core'
// import {FormsModule} from '@angular/forms';
/*ez minden angular projekthez kell, ha nem standalone, hanem moduls felépítésű*/
import {BrowserModule} from '@angular/platform-browser';
import {App} from './app';
import {HeaderComponent} from './header/header.component';
import {UserComponent} from './user/user.component';
// import {TasksComponent} from './tasks/tasks-component';
// import {CardComponent} from './shared/card/card-component';
// import {TaskComponent} from './tasks/task/task-component';
// import {NewTaskComponent} from './tasks/new-task/new-task-component';
import {SharedModule} from './shared/shared.module';
import {TasksModule} from './tasks/tasks.module';


@NgModule({
  /*ide csak standalone = false componensek kerülhetnek, és azok mindig ide jönnek*/
  declarations: [
    App,
    HeaderComponent,
    UserComponent,
    // TasksComponent,
    // TaskComponent,
    // NewTaskComponent,
    // CardComponent
  ],
  /*ez csak abban a file-ban lehet, amit a main.ts-ben megadtunk*/
  bootstrap: [App],
  /*ide jöhetnek a standalone = true komponensek és a beépített angularosok, illetve a module-ok*/
  /*Az importált modulokat a declaration-ben lévő componentek tudják használni, de az importok egymást nem,
  ezért a TasksModule-ba be kell külön is importálni a SharedModule-t*/
  /*Viszont a BrowserModule speciális beépített és csak a root module-ba húzható be, így ha másik module
  * ebből szeretne használni vmit, akkor a használandó részt külön kell behúzni, nekünk a DatePipe-ot
  * vagy egy másik modult, amiben ez benne van pl. CommonModule*/
  /*A FormsModule-t csak a task használja, így elég ott importálni*/
  imports: [BrowserModule, /*FormsModule,*/ SharedModule, TasksModule]
})
export class AppModule {
}
