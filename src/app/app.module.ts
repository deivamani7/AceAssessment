import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
@NgModule({
  declarations: [
    AppComponent,
    NumericDirective,
    SaveButtonDirective
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,FormsModule,MatSnackBarModule,
    HttpClientModule,FlexLayoutModule,MatFormFieldModule,MatInputModule,MatToolbarModule,MatSortModule,MatPaginatorModule,
    BrowserAnimationsModule,MatSidenavModule,MatTableModule,MatIconModule ,MatCardModule, MatButtonModule
  ],
  providers: [{provide: 'BASE_URL',useValue: environment.baseRestUrl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
