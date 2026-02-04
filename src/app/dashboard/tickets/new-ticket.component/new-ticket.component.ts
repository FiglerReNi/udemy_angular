import {Component, ElementRef, ViewChild} from '@angular/core';
import {ButtonComponent} from "../../../shared/button/button.component";
import {ControlComponent} from "../../../shared/control/control.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-ticket',
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  // ide template variable jön a html-ből: pl #form -> form, de írhatunk ide class name-t is
    @ViewChild('form') form?: ElementRef<HTMLFormElement>;

    // @ViewChild(ButtonComponent) btn: any;
  // onSubmit(titleElement: HTMLInputElement) {
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
  // onSubmit(title: string, ticketText: string, form: HTMLFormElement) {
  onSubmit(title: string, ticketText: string) {
    console.log(title, ticketText);
    // html-ként adja vissza a html elemet
    // console.log(titleElement);
    // object-ként adja vissza a html elemet
    // console.dir(titleElement);
    // const enteredTitle = titleElement.value;
    // console.log(enteredTitle);
    // form.reset();
    this.form?.nativeElement.reset();
  }

}
