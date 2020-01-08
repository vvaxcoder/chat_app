import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.init();
  }

  init() { 
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  signupUser() {
    this.authService.registerUser(this.signupForm.value).subscribe(data => {
      console.log('data = ', data);

      this.signupForm.reset();

      this.router.navigate(['streams']);
    }, error => {
      console.log(error);

      if (error.error.msg) {
        this.errorMessage = error.error.msg[0].message;
      }

      if (error.error.message) {
        this.errorMessage = error.error.message;
      }
    });
  }

}
