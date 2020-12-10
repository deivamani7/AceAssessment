import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';
  message ='';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
  ) { 
      // redirect to home if already logged in
      if (this.authService.loggedInUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

  }

  get formControls() { return this.loginForm.controls; }

  submit() {
      this.loading = true;
      this.authService.login(this.formControls.username.value, this.formControls.password.value)
          .pipe(first())
          .subscribe(
              data => {
                this.router.navigate(['/']);
                this.message = "loggedIn";
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }

  hasError(controlName: string, errorName: string){
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}