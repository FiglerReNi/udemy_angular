import {Component, ElementRef, Inject, viewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TasksService} from "../tasks.service";
import {TasksServiceToken} from "../../app.module";
// import {TaskServiceToken} from "../../../main";

@Component({
  selector: 'app-new-task',
  // standalone: true,
  standalone: false,
  // imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  // private tasksService: TasksService;

  // dependenci injection
  // constructor(tasksService: TasksService) {
  //   this.tasksService = tasksService;
    // ez így azért nem jó mert egy példányt csinálok ide a service-ből, és a listához, ahol megjelenítem
    // lenne egy másik példány. Viszont mivel a servicben van a task adatforrás listám, így abból is két
    // külön példány lesz és ha itt hozzáadok egy újat, azt a lista példánya nem fogja látni.
    // A cél az lenne, hogy az egész alkalmazás egy darab service-n osztozzon:
    // dependenci injection-nal csináljuk
    // this.tasksService = new TasksService();
  // }

  // constructor(private tasksService: TasksService) {}
  constructor(@Inject(TasksServiceToken) private tasksService: TasksService) {}

  onAddTask(title: string, description: string) {
    // this.tasksService.addTask({title: title, description: description});
    this.tasksService.addTask({ title, description });
    this.formEl()?.nativeElement.reset();
  }
}
