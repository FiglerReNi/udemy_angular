import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // A subjectben csak akkor lesz érték, ha valahol felirakoztunk rá a .subscribe-al és nincs kezdő érték
  //A BehaviorSubject-nél van kezdő érték és mindig tárolja az autolsó értéket, amit a .subscribe helyen át is ad.
  // user = new Subject<User>();
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }
  signUp(email:'', password:''){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOKhIQ82aW43oJyyvW9Ub5mRcF-D7DIWQ',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      // const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
      // const user = new User(
      //   resData.email, resData.localId, resData.idToken, expirationDate
      // );
      // this.user.next(user)
    }))
    //   errorRes => {
    //   let errorMessage = 'An error occurred';
    //   if (!errorRes.error || !errorRes.error.error ) {
    //     return throwError(errorMessage);
    //   }
    //   switch (errorRes.error.error.message) {
    //     case 'EMAIL_EXISTS':
    //       errorMessage = 'This email exists already';
    //   }
    //   return throwError(errorMessage);
    // }
    // ));
  }

  login(email:string, password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOKhIQ82aW43oJyyvW9Ub5mRcF-D7DIWQ',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
  }));
  }

  autoLogin(){
    const userData: {
      email: string,
      id:string,
      _token:string,
      _tokenExpirationDate:string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
    // localStorage.clear()
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer =  setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
    const user = new User(
      email, userId, token, expirationDate
    );
    this.user.next(user)
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error ) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'This email or password is not correct';
    }
    return throwError(errorMessage);
  }
}
