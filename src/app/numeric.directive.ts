import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: '[appNumeric]'
})
export class NumericDirective {
  @Input("decimals") decimals = 0;

  private check(value: string) {
    if (this.decimals <= 0) {
      return String(value).match(new RegExp(/^\d+$/));
    } else {
      var regExpString =
        "^\\s*((\\d+(\\.\\d{0," +
        this.decimals +
        "})?)|((\\d*(\\.\\d{1," +
        this.decimals +
        "}))))\\s*$";
      return String(value).match(new RegExp(regExpString));
    }
  }

  private run(oldValue,event) {
    setTimeout(() => {
      let currentValue: string = this.element.nativeElement.value;
      this.element.nativeElement.value = currentValue.trim();
      console.log(currentValue);
      if(event.key === 'Backspace')
      {
      if(currentValue.includes(".") && currentValue.indexOf(".") == currentValue.length-1){
        this.element.nativeElement.value= currentValue.replace(".","")
      }
      }
        if (currentValue !== "" && !this.check(currentValue)) {
          console.log(oldValue);
          this.element.nativeElement.value = oldValue;
        }
    });
  }

  constructor(private element: ElementRef) {}

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    if(event.key === 'Backspace')
    {
      let value:string =this.element.nativeElement.value;
      console.log(value);

    }
    this.run(this.element.nativeElement.value,event);
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    this.run(this.element.nativeElement.value,event);
  }
  
}
