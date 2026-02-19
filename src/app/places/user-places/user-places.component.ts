import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import {Place} from "../place.model";
// import {catchError, map, throwError} from "rxjs";
// import {HttpClient} from "@angular/common/http";
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isFetching = signal(false);
  error = signal('');
  // places = signal<Place[] | undefined>(undefined);
  private placeService = inject(PlacesService);
  places = this.placeService.loadedUserPlaces;
  // private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placeService.loadUserPlaces()
    // this.httpClient.get<{places: Place[]}>('http://localhost:3000/user-places')
    // .pipe(
    //   map((resData) => resData.places),
    //   catchError((error) => {
    //     console.log(error);
    //     return throwError(() => new Error('Something went wrong fetching your favorite places. Please try again later.'))
    //   }))
    .subscribe({
      // next: (places) => {
      //   console.log(places);
      //   this.places.set(places);
      // },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onRemovePlace(place: Place) {
    const subscription = this.placeService.removeUserPlace(place).subscribe();

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
