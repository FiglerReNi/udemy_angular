import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TasksService} from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task-component.html',
  styleUrl: './new-task-component.css'
})
export class NewTaskComponent {
  @Output() cancel = new EventEmitter<void>();
  @Input({required: true}) userId!: string;
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';
  private taskService = inject(TasksService)

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
  }
}
