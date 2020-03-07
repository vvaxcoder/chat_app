import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  showSpinner = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private tokenService: TokenService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    this.showSpinner = true;

    this.authService.loginUser(this.loginForm.value).subscribe(data => {
      this.tokenService.setToken(data.token);

      this.loginForm.reset();

      setTimeout(() => {
        this.router.navigate(['streams']);
      }, 2000);
    }, error => {
      this.showSpinner = false;

      if (error.error.msg) {
        this.errorMessage = error.error.msg[0].message;
      }

      if (error.error.message) {
        this.errorMessage = error.error.message;
      }
    });
  }

}
