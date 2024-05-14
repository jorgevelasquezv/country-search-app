import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/regions.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService{
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { countries: [] },
  };

  constructor(private http: HttpClient) {this.loadFromLocalStorage();}

  public searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(term, 'capital').pipe(
      tap((countries) => {
        this.cacheStore.byCapital = { term, countries };
        this.saveToLocalStorage();
      })
    );
  }

  public searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesRequest(term, 'name').pipe(
      tap((countries) => {
        this.cacheStore.byCountry = { term, countries };
        this.saveToLocalStorage();
      })
    );
  }

  public searchRegion(region: Region): Observable<Country[]> {
    return this.getCountriesRequest(region, 'region').pipe(
      tap((countries) => {
        this.cacheStore.byRegion = { region, countries };
        this.saveToLocalStorage();
      })
    );
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length === 1 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  private getCountriesRequest(term: string, path: string) {
    const url = `${this.apiUrl}/${path}/${term}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    const cacheStore = localStorage.getItem('cacheStore');
    if (cacheStore) {
      this.cacheStore = JSON.parse(cacheStore);
    }
  }
}
