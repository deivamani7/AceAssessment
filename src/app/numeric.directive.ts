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

  private run(oldValue, event) {
    setTimeout(() => {
      let currentValue: string = this.element.nativeElement.value;
      this.element.nativeElement.value = currentValue.trim();
      if (event.key === 'Backspace') {
        if (currentValue.includes(".") && currentValue.indexOf(".") == currentValue.length - 1) {
          this.element.nativeElement.value = currentValue.replace(".", "")
        }
      }
      if (currentValue !== "" && !this.check(currentValue)) {
        this.element.nativeElement.value = oldValue;
      }
    });
  }

  constructor(private element: ElementRef) { }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    this.run(this.element.nativeElement.value, event);
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    this.run(this.element.nativeElement.value, event);
  }

}
