import { UsersService } from './../../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.passwordForm = this.fb.group({
      cpassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.validate.bind(this)
    });
  }

  changePassword() {
    this.usersService.changePassword(this.passwordForm.value).subscribe(data => {
      this.passwordForm.reset();
    }, err => console.log(err));
  }

  validate(passwordFormGroup: FormGroup) {
    // tslint:disable-next-line: variable-name
    const new_password = passwordFormGroup.controls.newPassword.value;

    // tslint:disable-next-line: variable-name
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (!confirm_password.length) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }
}
