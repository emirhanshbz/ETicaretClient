import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: CustomerComponent}, //"customer" customer diye bir istek gelirse CustomerComponent'i çalıştır
    ])
  ]
})
export class CustomerModule { }
