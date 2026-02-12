import {
  ChangeDetectionStrategy,
  // ChangeDetectorRef,
  Component,
  inject
  // DestroyRef,
  // input,
  // OnInit
} from '@angular/core';
import {MessagesService} from "../messages.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  imports: [
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// export class MessagesListComponent implements OnInit {
export class MessagesListComponent {
  // messages = input.required<string[]>();
  private messagesService = inject(MessagesService);
  // nem kell feltétlenül ugyanúgy hívni mint a service-ben
  messages$ = this.messagesService.messages$;
  // messages = this.messagesService.allMessages;
  // ezzel tudjuk triggerelni a change detection-t, ami a signal mentesség és az onPush miatt itt nem történik meg,
  // amikor váltoik a lista, ehhez kell a service-ben az RxJs használata is
  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);
  // messages:string[] = [];

  // get messages() {
  //   return this.messagesService.allMessages;
  // }

  // itt tudunk feliratkozni a service-ben lévo rxjs által létrehozott változóra feliratkozni, hogy lefusson a
  // change detection, ha változik.
  // ngOnInit() {
  //   this.messagesService.messages$.subscribe(() => this.cdRef.markForCheck());
  // }
  // ngOnInit() {
  //   const subscription = this.messagesService.messages$.subscribe((messages) => {
  //     this.messages = messages;
  //     // ezzel lefut a changedetector ezen a komponensen és a html is befrissül
  //     this.cdRef.markForCheck()
  //   });
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //     }
  //   )
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
