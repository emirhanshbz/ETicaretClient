import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';

//bir modülün birden fazla componenti olabilir

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
