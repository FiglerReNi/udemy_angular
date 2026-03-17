import { Component } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/analytics.service';
// import { SharedModule } from 'src/app/shared/shared.module';
import { HighlightDirective } from 'src/app/shared/highlight.directive';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  // imports: [SharedModule],
  imports: [HighlightDirective],
  standalone: true, //default, nem kell feltétlenül kiírni
  // standalone: false
  // providers: [AnalyticsService] // ha itt adom meg akkor külön példányt kap ez az osztály, ha ezt nem rakom ide,
  // akkor a service-n lévő provideIn szerint megy, ami most root, tehát bármelyik .ts használhatja és egy példányon
  // fognak osztozkodni.
})
export class DetailsComponent {
  constructor(private analyticsService: AnalyticsService) {}

  onClick() {
    this.analyticsService.registerClick();
  }
}
