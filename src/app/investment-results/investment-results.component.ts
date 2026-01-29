import {Component, computed, inject, Input, input} from '@angular/core';
// https://angular.dev/api/common/CurrencyPipe
// import {CurrencyPipe} from '@angular/common';
import {InvestmentService} from '../investment.service';

@Component({
  selector: 'app-investment-results',
  // imports: [
  //   CurrencyPipe
  // ],
  standalone: false,
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {

  // ugyanaz, minta konstruktoron keresztül csinálnánk
  private investmentService = inject(InvestmentService)

  // használhatjuk vátozóként az ilyen szintakszissal megadott nevet
  // get results() {
  //   return this.investmentService.resultsData;
  // }

  // signal esetén
  // a computed és az asReadOnly is csak olvashatóvá teszi az eredményt, nem lehet felülírni
  results = computed(() => this.investmentService.resultsData());
  // results = this.investmentService.resultsData.asReadonly();

  // results = input<{
  //     year: number;
  //     interest: number;
  //     valueEndOfYear: number;
  //     annualInvestment: number;
  //     totalInterest: number;
  //     totalAmountInvested: number;
  //    }[] | undefined>();
  // @Input() results?: {
  //   year: number;
  //   interest: number;
  //   valueEndOfYear: number;
  //   annualInvestment: number;
  //   totalInterest: number;
  //   totalAmountInvested: number;
  // }[]

}
