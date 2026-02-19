import { bootstrapApplication } from '@angular/platform-browser';
import { LoggingInterceptor } from './logging.interceptor';
import { AppComponent } from './app/app.component';
import {
  HTTP_INTERCEPTORS, HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors, withInterceptorsFromDi
} from "@angular/common/http";
import {tap} from "rxjs";

//Osztály alapú Interceptor
// bootstrapApplication(AppComponent, {
//   providers: [provideHttpClient(
//     withInterceptorsFromDi()),
//     { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
//   ]
// }).catch((err) => console.error(err));
//

// Function alapú Interceptor
function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Így tudjuk változtatni az eredeti requestet, pl, ha mindenhol szükségünk van egy header kiegészítésre
  // const req = request.clone({
  //   headers: request.headers.set('X-DEBUG', 'TESTING')
  // });
  console.log('[Outgoing Request]');
  console.log(request);
  // return next(req);
  return next(request).pipe(
    tap({
      next: event => {
        if (event.type === HttpEventType.Response){
          console.log('[Incoming Response]');
          console.log(event.status);
          console.log(event.body);
        }
      }
  })
  );
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(
    withInterceptors([loggingInterceptor])
  )]
}).catch((err) => console.error(err));
