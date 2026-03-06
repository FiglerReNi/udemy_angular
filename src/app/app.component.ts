import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';
  private authService: AuthService = inject(AuthService)
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}


/*https://firebase.google.com/docs/reference/firebase-management/rest*/
