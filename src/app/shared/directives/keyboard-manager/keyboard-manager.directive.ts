import { KeyboardManagedItemDirective } from './keyboard-managed-item.directive';
import {
  ContentChildren,
  Directive,
  HostListener,
  QueryList,
} from '@angular/core';

@Directive({
  selector: '[appKeyboardManager]',
})
export class KeyboardManagerDirective {
  constructor() { }

  @ContentChildren(KeyboardManagedItemDirective)
  public items: QueryList<KeyboardManagedItemDirective> = null;

  @HostListener('keyup', ['$event'])
  public manageKeys(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        console.log('up');
        this.moveFocus(ArrowDirection.RIGHT).focus();
        break;
      case 'ArrowDown':
        console.log('down');
        this.moveFocus(ArrowDirection.LEFT).focus();
        break;
      case 'ArrowLeft':
        console.log('left');
        this.moveFocus(ArrowDirection.LEFT).focus();
        break;
      case 'ArrowRight':
        console.log('right');
        this.moveFocus(ArrowDirection.RIGHT).focus();
        break;
    }
  }

  public moveFocus(direction: ArrowDirection): KeyboardManagedItemDirective {
    const items = this.items.toArray();
    const currentSelectedIndex = items.findIndex(item => item.isFocused());
    const targetElementFocus = items[currentSelectedIndex + direction];
    if (targetElementFocus) {
      return targetElementFocus;
    }
    return direction === ArrowDirection.LEFT
      ? items[items.length - 1]
      : items[0];
  }
}

enum ArrowDirection {
  LEFT = -1,
  RIGHT = 1,
}
