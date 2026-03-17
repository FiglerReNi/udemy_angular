import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// megadhatjuk a main-ben is a providert, ha globálisan kell nekünk ez a service
@Injectable()
export class AnalyticsService {
  registerClick() {
    console.log('Clicked!');
  }
}
