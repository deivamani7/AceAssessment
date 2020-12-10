import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule,By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { ErrorComponent } from '../error/error.component';
import { ErrorInterceptor } from '../interceptor/http-error-interceptor';
import { LoginInterceptor } from '../interceptor/login-interceptor';
import { LoginComponent } from '../login/login.component';
import { NumericDirective } from '../numeric.directive';
import { HomeComponent } from './home.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { Item } from '../model/item';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let item: Item;
  let itemArray: Item[];
  beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [
            AppComponent,
            NumericDirective,
            HomeComponent,
            LoginComponent,
            ErrorComponent,
            MatSidenav
          ],
          imports: [
            BrowserModule,ReactiveFormsModule,FormsModule,MatSnackBarModule,
            HttpClientModule,FlexLayoutModule,MatFormFieldModule,MatInputModule,MatToolbarModule,MatSortModule,MatPaginatorModule,
            BrowserAnimationsModule,MatSidenavModule,MatTableModule,MatIconModule ,MatCardModule, MatButtonModule, AppRoutingModule
          ],
          providers: [
            {provide: 'BASE_URL',useValue: environment.baseRestUrl},
            {provide: 'DOMAIN_URL',useValue: environment.domainUrl},
            {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
            {provide: HTTP_INTERCEPTORS,useClass: LoginInterceptor, multi: true}
          ],

        }).compileComponents();
    }
);

beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      id: new FormControl('',),
      name: new FormControl('', [Validators.required]),
      rate: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      amount: new FormControl('',),
      createdAt: new FormControl('',),
      updatedAt: new FormControl('',)
    });


});

  it('Item Form is invalid', () => {
    component.form.controls['name'].setValue('');
    component.form.controls['rate'].setValue('');
    component.form.controls['quantity'].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('Item Form is valid', () => {
    component.form.controls['name'].setValue('Wrenches');
    component.form.controls['rate'].setValue('15');
    component.form.controls['quantity'].setValue('20');
    expect(component.form.valid).toBeTruthy();
  });

  it('Amount is calculated', () => {
    item = new Item();
    item.rate = '15';
    item.quantity = '20';
    component.call(item);
    expect(component.form.controls['amount'].value).toEqual('300.00');
  });

  it('Total is calculated', () => {
    let item1 = new Item();
    item1.amount = '300.00'
    let item2 = new Item();
    item2.amount = '450.10'
    let item3 = new Item();
    item3.amount = '120.60'
    itemArray = [item1,item2,item3]
    component.calculateTotal(itemArray)
    expect(component.totalValue).toEqual('870.70')
  });


  it('Rate required Validation', () => {
    component.form.controls['rate'].setValue('');
    expect(component.form.controls['rate'].errors).toEqual({ required: true });
  });

  it('Quantity required Validation', () => {
    component.form.controls['quantity'].setValue('');
    expect(component.form.controls['quantity'].errors).toEqual({ required: true });
  });

});
