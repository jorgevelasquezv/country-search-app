import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  public searchCapital(term: string): Observable<Country[]> {
    return this.search(term, 'capital');
  }

  public searchCountry(term: string): Observable<Country[]> {
    return this.search(term, 'name');
  }

  public searchRegion(region: string): Observable<Country[]> {
    return this.search(region, 'region');
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => countries.length === 1 ? countries[0] : null),
      catchError(() => of(null))
    );
  }

  private search(term: string, path: string) {
    const url = `${this.apiUrl}/${path}/${term}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }
}
