import {Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {type NewTaskData} from './new-task.model';
import {TasksService} from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task-component.html',
  styleUrl: './new-task-component.css'
})
export class NewTaskComponent {
  // void, ha nem adunk át adatot, csak az a lényeg, hogy megtörtént az esemény
  @Output() cancel = new EventEmitter<void>();
  @Input({required: true}) userId!: string;
  // @Output() add = new EventEmitter<{title: string, summery: string, date: string}>();
  // @Output() add = new EventEmitter<NewTaskData>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';
  private taskService = inject(TasksService)
  // enteredTitle = signal('');
  // enteredSummary= signal('');
  // enteredDate = signal('');

  onCancel(){
    this.cancel.emit();
  }

  onSubmit(){
    this.taskService.addTask({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.enteredDate
    }, this.userId)
    this.cancel.emit();
    // this.add.emit({
    //   title: this.enteredTitle,
    //   summary: this.enteredSummary,
    //   date: this.enteredDate
    // })
  }
}
