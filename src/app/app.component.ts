import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  amountDisable:boolean = true;
  total:number = 0;
  public form: FormGroup;
  public itemList: FormArray;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
    this.itemList = this.form.get('items') as FormArray;

  }

  createItem(): FormGroup {
    return this.fb.group({
      item: [null, Validators.compose([Validators.required])],
      rate: [null, Validators.compose([Validators.required])],
      quantity: [null, Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required])]
    });
  }

  addItem() {
    this.itemList.push(this.createItem());
  }

  removeItem(index) {
    this.itemList.removeAt(index);
    this.total = 0;
      for(let control of this.itemList.controls)
      {
        this.total = this.total + Number(control.get('amount').value);
      }
      this.total = Number(this.total.toFixed(2));
  }

  get itemFormGroup() {
    return this.form.get('items') as FormArray;
  }

  getItemsFormGroup(index): FormGroup {
    const formGroup = this.itemList.controls[index] as FormGroup;
    return formGroup;
  }


  submit() {
    console.log(this.form.value);
  }

  call(item){
    if(item.get('quantity').value >0 && item.get('rate').value > 0)
    {
      item.get('amount').setValue((item.get('quantity').value * item.get('rate').value).toFixed(2))
      this.total = 0;
      for(let control of this.itemList.controls)
      {
        this.total = this.total + Number(control.get('amount').value);
      }
      this.total = Number(this.total.toFixed(2));
    }else{
      item.get('amount').setValue("")
      this.total = 0;
      for(let control of this.itemList.controls)
      {
        this.total = this.total + Number(control.get('amount').value);
      }
      this.total = Number(this.total.toFixed(2));
    }
  }
 
}
