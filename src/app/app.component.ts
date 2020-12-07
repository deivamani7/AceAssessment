import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from './model/item';
import { ItemDataService } from './service/item-data.service';
import { PrintPDFService } from './service/print-pdf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
 

constructor(){

}

ngOnInit(){
  
}

}