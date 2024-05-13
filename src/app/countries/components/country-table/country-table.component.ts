import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: `img{
    width: 40px;
    border-radius: 20%;
  }`,
})
export class CountryTableComponent {
  @Input() countries: Country[] = [];

  constructor() {}
}
