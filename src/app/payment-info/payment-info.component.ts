import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BillingService } from '../services/billing.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  selectedPaymentMethod = 'Credit Card';
  paymentOptions: string[] = ['Credit Card', 'eCheck'];
  isLoading = true;
  constructor(private authService: AuthService, private billingService: BillingService) { }

  ngOnInit() {
    console.log(this.authService.userInfo); // UserDetails are stored in authservice everytime we refresh the app using a resolver or authguard
    // GET REQUEST with userInfo.
    this.billingService.getBillingInfo(this.authService.userInfo).subscribe((data) => {
      console.log(data);
      this.isLoading = false;
    }, error => {
      console.log(error)
    })
  }

  changePaymentOption(event) {
    this.selectedPaymentMethod = event.value;
  }

}