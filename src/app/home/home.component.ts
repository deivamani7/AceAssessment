import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Item } from '../model/item';
import { AuthService } from '../service/auth/auth.service';
import { ItemDataService } from '../service/item-data.service';
import { PrintPDFService } from '../service/print-pdf.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit  {
  amountDisable: boolean = true;
  total: number = 0;
  totalValue:string="";
  formTitle: string;
  formButton: string;
  public form: FormGroup;
  public itemArray: Item[];
  public displayedColumns = ['name', 'rate', 'quantity', 'amount', 'actions'];
  public dataSource = new MatTableDataSource<Item>();
  constructor(private router: Router,private authService: AuthService,private fb: FormBuilder, private service: ItemDataService, private element: ElementRef,private pdfService: PrintPDFService,private _snackBar: MatSnackBar) { }
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('formDirective') private formDirective: NgForm;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  reason = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';



  close(reason: string) {
    this.reason = reason;
    this.formDirective.resetForm();
    this.sidenav.close();
  }
  ngOnInit() {
    this.getAllItems();
    this.form = new FormGroup({
      id: new FormControl('',),
      name: new FormControl('', [Validators.required]),
      rate: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      amount: new FormControl('',),
      createdAt: new FormControl('',),
      updatedAt: new FormControl('',)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllItems() {
    this.service.getAllItems().subscribe(data => {
      this.dataSource.data = data as Item[];
      this.itemArray = this.dataSource.data;
      this.calculateTotal(this.dataSource.data);
    })
  }

  update(element) {
    this.formTitle = " Update Item";
    this.formButton = "Update";
    this.form.get('name').setValue(element.name);
    this.form.get('rate').setValue(element.rate);
    this.form.get('quantity').setValue(element.quantity);
    this.form.get('amount').setValue(element.amount);
    this.form.get('id').setValue(element.id);
    this.sidenav.open();
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'End now', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  delete(id: string) {
    this.service.deleteItem(id).subscribe(data => {
      this.getAllItems();
    })
  }

  call(item) {
    if (item.quantity > 0 && item.rate > 0) {
      this.form.get('amount').setValue((item.quantity * item.rate).toFixed(2))
    }
    if (item.quantity == "" || item.rate == "") {
      this.form.get('amount').setValue("")
    }
  }

  saveItem(item) {
    if (item.id == null) {
      console.log("saving");
      var itemObj = new Item();
      itemObj.name = item.name;
      itemObj.quantity = item.quantity
      itemObj.rate = item.rate;
      itemObj.amount = item.amount;
      this.service.createItem(itemObj).subscribe(data => {
        this.formDirective.resetForm();
        this.close('Saved');
        this.getAllItems();
        this.openSnackBar("New Item Added!!")
      })
    } else {
      console.log("updating")
      var itemObj = new Item();
      itemObj.name = item.name;
      itemObj.quantity = item.quantity
      itemObj.rate = item.rate;
      itemObj.amount = item.amount;
      this.service.updateItem(item.id, itemObj).subscribe(data => {
        this.formDirective.resetForm();
        this.close('Updated');
        this.getAllItems();
        this.openSnackBar("Item Updated!!")
      })
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  calculateTotal(items) {
    this.total = 0;
    if (items.length > 0) {
      for (let item of items) {
        this.total = this.total + Number(item.amount);
      }
      this.total = Number(this.total.toFixed(2));
      this.totalValue = this.total.toFixed(2);
    }
  }

  openNav() {
    this.formTitle = " Create New Item";
    this.formButton = "Create";
    this.formDirective.resetForm();
    this.sidenav.open();
  }

  onCancel() {
    this.formDirective.resetForm();
    this.sidenav.close();
  }

  doFilter(value){
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  printPDF(){
    this.pdfService.generatePdf(this.totalValue,this.itemArray);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
}
}

