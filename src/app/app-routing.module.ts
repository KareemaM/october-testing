import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentInfoComponent } from './payment-info/payment-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'payment-info', pathMatch: 'full' },
  { path: 'payment-info', component: PaymentInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
