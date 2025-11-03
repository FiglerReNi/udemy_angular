import { Component, signal } from '@angular/core';
import { HeaderComponent} from './header/header.component';
import { UserComponent } from './user/user.component'
import { DUMMY_USERS} from './dummy-users';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  users = DUMMY_USERS;

  onSelectUser(id: string){
    console.log(id);
    }
}
