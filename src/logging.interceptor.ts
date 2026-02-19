import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";


//Újabb változatokban ennek már nem csinálunk külön osztályt, hanem egy function lesz a main.ts-ben
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Request URL: ' + req.url);
        return next.handle(req);
    }
}
