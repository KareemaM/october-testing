import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  selectedPaymentMethod = 'Credit Card';
  paymentOptions: string[] = ['Credit Card', 'eCheck'];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log(this.authService.userInfo);
    // GET REQUEST with userInfo.
  }

  changePaymentOption(event) {
    this.selectedPaymentMethod = event.value;
  }

}