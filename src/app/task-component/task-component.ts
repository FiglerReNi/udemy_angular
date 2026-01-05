import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task-component.html',
  styleUrl: './task-component.css'
})
export class TaskComponent {
  // @Input() name: string | undefined;
  @Input() name?: string;
  // @Input({required: true}) name!: string;
}
