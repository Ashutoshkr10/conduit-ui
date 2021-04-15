import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authType: string = ''; // login || register
  title: string = ''; //login || register
  authForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.authForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      // Gets last piece of url (login||register)
      this.authType = data[data.length - 1].path;
      console.log(this.authType);
      //Set the title of page accordingly
      this.title = this.authType === 'login' ? 'Sign In' : 'Sign Up';
      // add form control for username in case of register page
      if (this.authType === 'register') {
        this.authForm.addControl(
          'username',
          new FormControl('', Validators.required)
        );
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    let formValue = this.authForm.value;
    console.log(formValue);
  }
}
