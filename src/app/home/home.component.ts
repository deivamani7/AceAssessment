import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
export class HomeComponent implements OnInit, AfterViewInit {
  totalValue: string = "";
  formTitle: string;
  formButton: string;
  public form: FormGroup;
  public itemArray: Item[];
  public displayedColumns = ['name', 'rate', 'quantity', 'amount', 'actions'];
  public dataSource = new MatTableDataSource<Item>();
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('formDirective') private formDirective: NgForm;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    private router: Router,
    private authService: AuthService,
    private service: ItemDataService,
    private pdfService: PrintPDFService,
    private snackBar: MatSnackBar) { }

  close() {
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
    this.snackBar.open(message, 'End now', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  delete(id: string) {
    this.service.deleteItem(id).subscribe(data => {
      this.openSnackBar("Item Deleted!!")
      this.getAllItems();
    }, error => {
      this.openSnackBar("Item not Deleted!!")
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
      var itemObj = new Item();
      itemObj.name = item.name;
      itemObj.quantity = item.quantity
      itemObj.rate = item.rate;
      itemObj.amount = item.amount;
      this.service.createItem(itemObj).subscribe(data => {
        this.close();
        this.getAllItems();
        this.openSnackBar("New Item Added!!")
      }, error => {
        this.openSnackBar("Item Not Added!!")
      })
    } else {
      var itemObj = new Item();
      itemObj.name = item.name;
      itemObj.quantity = item.quantity
      itemObj.rate = item.rate;
      itemObj.amount = item.amount;
      this.service.updateItem(item.id, itemObj).subscribe(data => {
        this.close();
        this.getAllItems();
        this.openSnackBar("Item Updated!!");
      }, error => {
        this.openSnackBar("Item Not Updated!!")
      })
    }
  }

  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

  calculateTotal(items) {
    var total = 0;
    if (items.length > 0) {
      for (let item of items) {
        total = total + Number(item.amount);
      }
      total = Number(total.toFixed(2));
      this.totalValue = total.toFixed(2);
    }
  }

  openNav() {
    this.formTitle = " Create New Item";
    this.formButton = "Create";
    this.formDirective.resetForm();
    this.sidenav.open();
  }

  doFilter(value) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  printPDF() {
    this.pdfService.generatePdf(this.totalValue, this.itemArray);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

