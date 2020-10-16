import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // UserInfo saves data from main API whenever app refreshes.
  userInfo = {
    userId: 123,
    zipcode: 456
  };
  constructor() { }
}
