import { Component, Input, Output, EventEmitter, computed, signal, input, output } from '@angular/core';
import { User } from './user.model';
import {CardComponent} from '../shared/card/card-component';
// import { type User } from './user.model';
// import { DUMMY_USERS } from '../dummy-users';

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

// type User =  {
//   id: string;
//   avatar: string;
//   name: string;
// }

// interface User {
//   id: string;
//   avatar: string;
//   name: string;
// }

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  imports: [
    CardComponent
  ],
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({required: true}) user!: User;
  @Input({required:true}) selected!: boolean;
  // @Input({required: true}) user!: {
  //   id: string;
  //   avatar: string;
  //   name: string;
  // }
  // @Input({required: true}) avatar!: string;
  // @Input({required: true}) name!: string;
  // @Input({required: true}) id!: string;
  @Output() select = new EventEmitter<string>()
  // select = output<string>()
  // @Output() select = new EventEmitter()
  // avatar = input();
  // avatar = input('');
  // avatar = input<string>();
//   avatar = input.required<string>();
//   name = input.required<string>();
//   imagePathVariation = computed(() => 'assets/users/' + this.avatar());

  get imagePath(){
    return 'assets/users/' + this.user.avatar
  }
  // selectedUser = DUMMY_USERS[randomIndex];
  // selectedUserVariation = signal(DUMMY_USERS[randomIndex]);
  // imagePathVariation = computed(() => 'assets/users/' + this.selectedUserVariation().avatar);



  onSelectUser () {
    this.select.emit(this.user.id);
    // const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    // this.selectedUser = DUMMY_USERS[randomIndex];
    // console.log('Clicked!');
  }

  // onSelectUserVariation() {
  //   const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
  //   this.selectedUserVariation.set(DUMMY_USERS[randomIndex]);
  // }
}
