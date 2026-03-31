import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(fetchedPosts => (this.posts = fetchedPosts));
  }
}


/* Service workers: Olyan mint egy proxy a http hívás és a frontend között, sok mindenre beállítható.
* Ami nekünk fontos, hogy tud olyat, hogy cache-el adatokat korábbi http hívásokból, és ha nem érhető
* el az internet, akkor ebből a cache-ből tud választ adni, tehát internet nélkül is működhet a frontend appunk
* Telepítés és regisztrálás: ng add @angular/pwa majd: npm run build --production, és ezt nem npm start-el indítuk, hanem
* telepítjük ezt: npm install -g http-server, a dist folderből tudjuk futtatni:
* cd dist/angular-pwa majd: http-server -p 8081 így a service-worker-t tudjuk használni
* A cache működését be kell állítani:*/
