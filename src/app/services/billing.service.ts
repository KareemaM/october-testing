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
    const url = this.url + '/userId/zipcode/';
    return this.http.get(url).pipe(
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
