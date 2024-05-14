import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debounce: Subject<string> = new Subject<string>();

  private debounceSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.debounceSubscription = this.debounce
      .pipe(debounceTime(300))
      .subscribe((searchTerm: string) => {
        this.onDebounce.emit(searchTerm);
      });
  }

  ngOnDestroy(): void {
    this.debounceSubscription?.unsubscribe();
  }

  public emitValue(value: string): void {
    this.onValue.emit(value);
  }

  public onKeyPress(searchTerm: string): void {
    this.debounce.next(searchTerm);
  }
}
