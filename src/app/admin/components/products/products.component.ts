import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { Create_Product } from '../../../contracts/create_product';
import { ListComponent } from './list/list.component';
import { DialogService } from '../../../services/common/dialog.service';
import { QrcodeReadingDialogComponent } from '../../../dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';


@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent {
  
  constructor(spinner: NgxSpinnerService, private dialogService: DialogService) { 
    super(spinner);
  }

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts();
  }

  showProductQrCodeReading() {
    this.dialogService.openDialog({
      componentType: QrcodeReadingDialogComponent,
      data: null,
      options: {
        width: "1000px"
      },
      afterClosed: () => { }
    });
  }

}
