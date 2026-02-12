import {ChangeDetectionStrategy, Component, signal} from '@angular/core';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  imports: [MessagesListComponent, NewMessageComponent],
  //ez hatni fog erre a komponensre és az importokra, így ezekben figyeli, hogy van-e hatása az eventnek
  // és ha nincs akkor kikerül az ellenőrzés alól
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  // messages = signal<string[]>([]);

  get debugOutput() {
    console.log('[Messages] "debugOutput" binding re-evaluated.');
    return 'Messages Component Debug Output';
  }

  // onAddMessage(message: string) {
  //   this.messages.update((oldMessages) => [...oldMessages, message]);
  // }
}
