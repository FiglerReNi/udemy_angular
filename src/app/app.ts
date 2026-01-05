import {Component, Output, signal} from '@angular/core';
import { HeaderComponent} from './header/header.component';
import { UserComponent } from './user/user.component'
import { DUMMY_USERS} from './dummy-users';
import { TaskComponent } from './task-component/task-component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, TaskComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  users = DUMMY_USERS;
  selectedUserId = 'u1';

  get selectedUser(){
    return this.users.find(user => user.id === this.selectedUserId);
  }

  onSelectUser(id: string){
    this.selectedUserId = id;
  }
}
