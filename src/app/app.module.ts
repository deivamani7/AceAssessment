import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumericDirective } from './numeric.directive';
import { environment } from '../../src/environments/environment';
import { SaveButtonDirective } from './save-button.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  MatSnackBarModule
} from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { BasicAuthInterceptor } from './interceptor/basic-auth-interceptor';
import { ErrorInterceptor } from './interceptor/http-error-interceptor';
import { loginProvider } from './interceptor/login-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NumericDirective,
    SaveButtonDirective,
    HomeComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,FormsModule,MatSnackBarModule,
    HttpClientModule,FlexLayoutModule,MatFormFieldModule,MatInputModule,MatToolbarModule,MatSortModule,MatPaginatorModule,
    BrowserAnimationsModule,MatSidenavModule,MatTableModule,MatIconModule ,MatCardModule, MatButtonModule, AppRoutingModule
  ],
  providers: [
    {provide: 'BASE_URL',useValue: environment.baseRestUrl},
    {provide: 'DOMAIN_URL',useValue: environment.domainUrl},
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    loginProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
