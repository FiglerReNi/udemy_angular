import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter, OnInit, output, Output,
  viewChild,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ButtonComponent} from "../../../shared/button/button.component";
import {ControlComponent} from "../../../shared/control/control.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-ticket',
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements AfterViewInit, OnInit {
  enteredTitle = '';
  enteredText = '';
  // ide template variable jön a html-ből: pl #form -> form, de írhatunk ide class name-t is
    @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
    // @Output() add = new EventEmitter<{title: string, text: string}>();
    add = output<{title: string, text: string}>();
  //   private form = viewChild<ElementRef<HTMLFormElement>>('form');
  //   private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
    // @ViewChildren(ButtonComponent) buttons?: Array<ButtonComponent | undefined>;
    // @ViewChild(ButtonComponent) btn: any;
  // onSubmit(titleElement: HTMLInputElement) {
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
  // onSubmit(title: string, ticketText: string, form: HTMLFormElement) {
  // onSubmit(title: string, ticketText: string) {
  onSubmit() {
    // console.log(title, ticketText);
    // html-ként adja vissza a html elemet
    // console.log(titleElement);
    // object-ként adja vissza a html elemet
    // console.dir(titleElement);
    // const enteredTitle = titleElement.value;
    // console.log(enteredTitle);
    // form.reset();
    // this.add.emit({title: title, text: ticketText});
    this.add.emit({title: this.enteredTitle, text: this.enteredText});
    this.enteredTitle = '';
    this.enteredText = '';
    // this.form?.nativeElement.reset();
    // this.form()?.nativeElement.reset();
    // this.form().nativeElement.reset();
  }

  ngOnInit() {
    // a viewchild-os elemek itt még undefined-k lehetnek
    console.log('on init');
    // console.log(this.form().nativeElement);
    console.log(this.form?.nativeElement);
  }

  ngAfterViewInit() {
    console.log('after view init');
    // console.log(this.form().nativeElement);
    console.log(this.form?.nativeElement);
  }



}
