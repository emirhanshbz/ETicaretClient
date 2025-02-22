import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Product } from '../../../contracts/product';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {
  
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) { 
    super(spinner);
  }

  ngOnInit(): void {
    
    this.showSpinner(SpinnerType.Fire);
    
    this.httpClientService.get<Product[]>({
      controller: "products"
    }).subscribe(data => console.log(data));

    // this.httpClientService.post({
    //   controller: "products"
    // }, {
    //   name:"Kalem",
    //   stock: 100,
    //   price: 15
    // }).subscribe();

    // this.httpClientService.put({
    //   controller: "products"
    // }, {
    //   id: "01952e61-58bc-729e-8f30-09578f3c725a",
    //   name: "Siyah Silgi",
    //   stock: 20,
    //   price: 4
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller: "products"
    // }, "01952e5f-9f6a-71fc-9729-fe254dbb9c53")
    // .subscribe();

    // this.httpClientService.get({
    //   baseUrl: "https://jsonplaceholder.typicode.com",
    //   controller: "posts"
    // }).subscribe(data => console.log(data));

    // this.httpClientService.get({
    //   fullEndPoint: "https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data => console.log(data));
  }

}
