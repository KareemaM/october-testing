import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  url = environment.backendUrl;
  constructor(private http: HttpClient) { }

  getBillingInfo(body: any) {
    const url = 'https://restcountries-v1.p.rapidapi.com/all';
    return this.http.get(url, {
      headers: {
        "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
        "x-rapidapi-key": "e435e00918mshed1f90d7cb251b2p1b7a25jsnb8024b17bba1"
      }
    }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.statusText}`;
    }
    return throwError(errorMessage);
  }
}
