import {Injectable, signal} from "@angular/core";
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  // a BehaviorSubject csinál egy wrappert az objektum köré és így feliratkozhatunk ezzel a változásaira,
  // ami tudunk olvasni a .ts oldalon
  messages$ = new BehaviorSubject<string[]>([]);
  // private messages = signal<string[]>([]);
  private messages: string[] = [];
  // allMessages = this.messages.asReadonly();

  get allMessages(){
    return [...this.messages];
  }

  addMessage(message:string) {
    // this.messages.update((preMessages) => [...preMessages, message]);
    this.messages = [...this.messages, message];
    // ezzel imitálunk rá egy új eventet, amit érzékelni tudunk a .ts-ben
    this.messages$.next([...this.messages]);
  }
}
