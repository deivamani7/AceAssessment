import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { ErrorComponent } from '../error/error.component';
import { HomeComponent } from '../home/home.component';
import { ErrorInterceptor } from '../interceptor/http-error-interceptor';
import { LoginInterceptor } from '../interceptor/login-interceptor';
import { NumericDirective } from '../numeric.directive';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NumericDirective,
        HomeComponent,
        LoginComponent,
        ErrorComponent
      ],
      imports: [
        BrowserModule, ReactiveFormsModule, FormsModule, MatSnackBarModule,
        HttpClientModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatSortModule, MatPaginatorModule,
        BrowserAnimationsModule, MatSidenavModule, MatTableModule, MatIconModule, MatCardModule, MatButtonModule, AppRoutingModule
      ],
      providers: [
        { provide: 'BASE_URL', useValue: environment.baseRestUrl },
        { provide: 'DOMAIN_URL', useValue: environment.domainUrl },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
      ],

    }).compileComponents();
  }
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    var formBuilder = new FormBuilder();
    component.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
    fixture.detectChanges();
  });


  
  it('Login Form is invalid', () => {
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Login Form is valid', () => {
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testuser');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('Login is valid', () => {
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testuser');
    component.submit();
    expect(component.message).toEqual("loggedIn");
  });

  it('Login is invalid', () => {
    component.loginForm.controls['username'].setValue('test');
    component.loginForm.controls['password'].setValue('test');
    component.submit();
    expect(component.error).toEqual("Username or password is incorrect");
  });


});
