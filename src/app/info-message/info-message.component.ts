import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-info-message',
  standalone: true,
  imports: [],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoMessageComponent {
  get debugOutput() {
    console.log('[InfoMessages] "debugOutput" binding re-evaluated.');
    return 'InfoMessage Component Debug Output'
    /*develop mode dupla change detection esetében megbukik, mert eltérő lesz az érték, amit generál*/
    // return Math.random();
  }

  onLog() {
    console.log('Clicked!');
  }
}
