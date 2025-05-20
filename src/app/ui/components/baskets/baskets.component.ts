import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { BasketService } from '../../../services/common/models/basket.service';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/update_basket_item';

declare var $: any;

@Component({
  selector: 'app-baskets',
  standalone: false,
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss'
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private basketService: BasketService) {
    super(spinner);
  }

  basketItems: List_Basket_Item[];
  async ngOnInit(): Promise<void> {
    this.basketItems = await this.basketService.get();
  }

  async changeQuantity(object: any) {
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
  }

  async removeBasketItem(basketItemId: string) {
    await this.basketService.remove(basketItemId);
    $("." + basketItemId).fadeOut(250);
  }

}
