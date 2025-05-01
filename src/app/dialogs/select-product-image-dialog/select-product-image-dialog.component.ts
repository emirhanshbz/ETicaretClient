import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { List_Product_Image } from '../../contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  standalone: false,
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  @Output() options: Partial<FileUploadOptions>;

  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(dialogRef);

    // this.data burada kullanılabilir çünkü artık constructor içindeyiz
    this.options = {
      accept: ".png, .jpg, .jpeg, .svg, .webp, .heif, .heic, .gif",
      action: "upload",
      controller: "products",
      explanation: "Ürün resimlerini seçin veya buraya sürükleyin",
      isAdminPage: true,
      queryString: `id=${this.data}`
    };
  }

  images: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallSpinClockwiseFade);
    this.images = await this.productService.readImages(this.data as string, () => this.spinner.hide(SpinnerType.BallSpinClockwiseFade)); //kesinlikle string veri gelecek diyoruz "as" ile
  }

  async deleteImage(imageId: string, event: any) {

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallSpinClockwiseFade);
        await this.productService.deleteImage(this.data as string, imageId, () => {
          this.spinner.hide(SpinnerType.BallSpinClockwiseFade);
          var card = $(event.srcElement).parent().parent();
          card.fadeOut(500);
        });
      }
    })   
  }
}

export enum SelectProductImageState {
  Close
}
