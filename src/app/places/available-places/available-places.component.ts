import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {Place} from '../place.model';
import {PlacesComponent} from '../places.component';
import {PlacesContainerComponent} from '../places-container/places-container.component';
// import {HttpClient} from "@angular/common/http";
// import {catchError, map, throwError} from "rxjs";
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  isFetching = signal(false);
  error = signal('');
  places = signal<Place[] | undefined>(undefined);
  private placesService = inject(PlacesService);
  // private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        console.log(places);
        this.places.set(places);
      },
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

  // ngOnInit() {
  //   this.isFetching.set(true);
  //   const subscription = this.httpClient.get<{places: Place[]}>('http://localhost:3000/places')
  //   .pipe(
  //     map((resData) => resData.places),
  //     catchError((error) => {
  //       console.log(error);
  //       return throwError(() => new Error('Something went wrong fetching the available places Please try again later.'))
  //     }))
  //   .subscribe({
  //     next: (places) => {
  //       console.log(places);
  //       this.places.set(places);
  //     },
  // error: (error) => {
  //   console.log(error);
  //   this.error.set('Something went wrong fetching the available places Please try again later.');
  // },
  //   error: (error: Error) => {
  //     this.error.set(error.message);
  //   },
  //   complete: () => {
  //     this.isFetching.set(false);
  //   }
  // });
  // const subscription = this.httpClient.get<{places: Place[]}>('http://localhost:3000/places').subscribe({
  //   next: (resData) => {
  //     console.log(resData.places);
  //     this.places.set(resData.places);
  //   }
  // });
  // const subscription = this.httpClient.get<{places: Place[]}>('http://localhost:3000/places', {
  //   observe: 'response'
  // }).subscribe({
  //   next: (response) => {
  //     console.log(response);
  //     console.log(response.body?.places);
  //   }
  // });
  // const subscription = this.httpClient.get<{places: Place[]}>('http://localhost:3000/places', {
  //   observe: 'events'
  // }).subscribe({
  //   next: (event) => {
  //     console.log(event);
  //   }
  // });
  // this.destroyRef.onDestroy(() => {
  //   subscription.unsubscribe();
  // })
  // }

  onSelectPlace(selectedPlace: Place) {
    // this.httpClient.put('http://localhost:3000/user-places', {placeId: selectedPlace.id})
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (resData) => {
        console.log(resData);
      }
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
