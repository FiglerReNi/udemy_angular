import {afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form')
  private destroyRef = inject(DestroyRef)

  constructor() {
    //ha a form elkészült és felépült, akkor futnak a benne lévő dolgok
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        // this.form().setValue({email: savedEmail, password: ''})
        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail);
        },1)
      }
      // debounceTime, a next-ek között ennyit vár a function és csak akkor ment, ha nem történt újabb leütés
      // így ha folyamatosan gépel vki, nem ment minden egyes leütés után
      const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        //a next minden billentyűütés után menti a beírt értéket
        next: (value) => {
          // eltároljuk a localStorage-ba
          window.localStorage.setItem('saved-login-form', JSON.stringify({'email': value.email}))
          console.log(value.email)
        }
      })
      this.destroyRef.onDestroy(() => subscription?.unsubscribe())
    })
  }


  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    console.log(formData);
    console.log(formData.form)
    const enteredEmail = formData.form.value.email
    const enteredPassword = formData.form.value.password
    console.log(enteredEmail, enteredPassword);

    formData.form.reset();
  }
}
