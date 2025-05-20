import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { List_Product } from '../../../../contracts/list_product';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../../../services/common/models/file.service';
import { BaseUrl } from '../../../../contracts/base_url';
import { BasketService } from '../../../../services/common/models/basket.service';
import { BaseComponent } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Basket_Item } from '../../../../contracts/basket/create_basket_item';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  currentPageNo: number = 1;
  totalProductCount: number = 0;
  totalPageCount: number = 0;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl: BaseUrl;

  products: List_Product[] = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private basketService: BasketService,
    private customToastrService: CustomToastrService
  ) { }

  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? "1", 10);

      const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(
        this.currentPageNo - 1, this.pageSize,
        () => { },
        errorMessage => { }
      );

      this.products = data.products.map<List_Product>(p => {
        const imageFile = p.productImageFiles.find(img => img.showcase);
        return {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: imageFile?.path ?? "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles
        };
      });

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];
      const startPage = Math.max(1, this.currentPageNo - 3);
      const endPage = Math.min(this.totalPageCount, this.currentPageNo + 3);

      for (let i = startPage; i <= endPage; i++) {
        this.pageList.push(i);
      }
    });
  }


  async addToBasket(product: List_Product) {
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.customToastrService.message("Ürün sepete eklendi", "Başarılı", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.BottomRight
    })
  }



  formatPrice(price: number | null): string {
    if (price == null) return 'Fiyat yok';
    return Number.isInteger(price) ? `${price} TL` : `${price.toFixed(2)} TL`;
  }

  stockStatus(stock: number): string | null {
    if (stock < 10) {
      return `Acele et! Son ${stock} ürün!`;
    }
    return null;
  }
}
