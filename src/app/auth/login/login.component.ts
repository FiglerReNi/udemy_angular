import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {debounceTime, of} from "rxjs";

// regular validátor
function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true };
}
//async validátor (ha át kell hívni a backendre, hogy ol adatbázisban ellenőrizze létezik-e már az email stb)
function emailIsUnique(control: AbstractControl) {
  //a második tag jön a backend hívásból
  if(control.value !== 'test@example.com'){
    //async validaor esetében egy Observale-val kell visszatérnünk
    return of(null);
  }
  return of({notUnique: true});
}

// ezt az ngOnInit-ben is lehet, ha van server oldali kapcsolódás a felülethez, akkor az a jobb megoldás
let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if(savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators:[emailIsUnique]
    }),
    // custom validátor lehet külön functionban
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    })
    //custom validátort közvetlenül is megadhaunk
    // password: new FormControl('', {
    //   validators: [Validators.required, Validators.minLength(6), (control) => {
    //    ...
    //   }],
    // })
  })

  // a reacive form-nál nem kell az afterRendert használni, mert mi a .ts-ben rakjuk össze a form-hoz való
  // hozzáférést, így az ngOninit-ben dolgozhatunk is vele
  ngOnInit(){
    // const savedForm = window.localStorage.getItem('saved-login-form');
    // if(savedForm){
    //   const loadedForm = JSON.parse(savedForm);
    //   this.form.patchValue({
    //     email: loadedForm.email
    //   }) ;
    // }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-login-form',
          JSON.stringify({email: value.email}));
      }
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  get emailIsInvalid(){
    return (this.form.controls.email.touched
      && this.form.controls.email.dirty
      && this.form.controls.email.invalid);
  }

  get passwordIsInvalid(){
    return (this.form.controls.password.touched
      && this.form.controls.password.dirty
      && this.form.controls.password.invalid);
  }

  onSubmit() {
    //itt is adhatunk meg még plusz validációkat
    // this.form.controls.email.addValidators(Validators.required);
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}
