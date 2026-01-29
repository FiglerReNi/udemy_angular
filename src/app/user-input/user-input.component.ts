import {Component, EventEmitter, Output, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import type {InvestmentInput} from '../investment-input.model';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {

  calculate = output<InvestmentInput>();
  // @Output() calculate = new EventEmitter<InvestmentInput>();

  enteredInitialInvestment = signal('0');
  enteredAnnualInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');

  // enteredInitialInvestment = '0';
  // enteredAnnualInvestment = '0';
  // enteredExpectedReturn = '5';
  // enteredDuration = '10';

  onSubmit() {
    this.calculate.emit({initialInvestment: +this.enteredInitialInvestment(),
      annualInvestment: +this.enteredAnnualInvestment(),
      expectedReturn: +this.enteredExpectedReturn(),
      duration: +this.enteredDuration()});
    this.enteredInitialInvestment.set('0');
    this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10');
    // console.log('Submitted:');
    // console.log(this.enteredInitialInvestment);
    // console.log(this.enteredAnnualInvestment);
    // console.log(this.enteredExpectedReturn);
    // console.log(this.enteredDuration);
  }
}
