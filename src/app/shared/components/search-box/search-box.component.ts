import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent {
  @Input() placeholder: string = '';

  @Output() public onValue: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('txtSearchInput')
  public searchInput!: ElementRef<HTMLInputElement>;

  public emitValue(value: string): void {
    this.onValue.emit(value);
  }
}
