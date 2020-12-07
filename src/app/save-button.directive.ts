import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSaveButton]'
})
export class SaveButtonDirective {

  constructor(private element: ElementRef) {}

  @HostListener('click', ['$event.target'])
  handleKeyDown(event: KeyboardEvent) {
    console.log("Savebutton event");
    console.log(this.element);
    this.element.nativeElement.innerHTML=" Saved "
  }
}
