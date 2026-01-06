import { Component, Output, signal } from '@angular/core';
import { HeaderComponent} from './header/header.component';
import { UserComponent } from './user/user.component'
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from './tasks/tasks-component';
import { NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  users = DUMMY_USERS;
  selectedUserId?: string;

  get selectedUser(){
    return this.users.find(user => user.id === this.selectedUserId);
  }

  onSelectUser(id: string){
    this.selectedUserId = id;
  }
}
