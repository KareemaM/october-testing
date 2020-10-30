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
      this.isLoading = false; // Once data is fetched we can release is loading
    }, error => {
      console.log(error)
      this.isLoading = false; // if any error, release is loading and display error
    })
  }

  detectCardType(cardNumber) {
    var jcb_regex = new RegExp('^(?:2131|1800|35)[0-9]{0,}$'); //2131, 1800, 35 (3528-3589)
    var amex_regex = new RegExp('^3[47][0-9]{0,}$'); //34, 37
    var diners_regex = new RegExp('^3(?:0[0-59]{1}|[689])[0-9]{0,}$'); //300-305, 309, 36, 38-39
    var visa_regex = new RegExp('^4[0-9]{0,}$'); //4
    var mastercard_regex = new RegExp('^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$'); //2221-2720, 51-55
    var maestro_regex = new RegExp('^(5[06789]|6)[0-9]{0,}$'); //always growing in the range: 60-69, started with / not something else, but starting 5 must be encoded as mastercard anyway
    var discover_regex = new RegExp('^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$');


    // get rid of anything but numbers
    cardNumber = cardNumber.replace(/\D/g, '');

    // checks per each, as their could be multiple hits
    var sel_brand = "unknown";
    if (cardNumber.match(jcb_regex)) {
        sel_brand = "jcb";
    } else if (cardNumber.match(amex_regex)) {
        sel_brand = "amex";
    } else if (cardNumber.match(diners_regex)) {
        sel_brand = "diners_club";
    } else if (cardNumber.match(visa_regex)) {
        sel_brand = "visa";
    } else if (cardNumber.match(mastercard_regex)) {
        sel_brand = "mastercard";
    } else if (cardNumber.match(discover_regex)) {
        sel_brand = "discover";
    } else if (cardNumber.match(maestro_regex)) {
        if (cardNumber[0] == '5') { //started 5 must be mastercard
            sel_brand = "mastercard";
        } else {
            sel_brand = "maestro"; //maestro is all 60-69 which is not something else, thats why this condition in the end
        }
    }

    console.log(sel_brand);
  }

  changePaymentOption(event) {
    this.selectedPaymentMethod = event.value;
  }

}