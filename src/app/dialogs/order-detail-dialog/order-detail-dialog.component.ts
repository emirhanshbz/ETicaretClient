import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../../services/common/dialog.service';
import { OrderService } from '../../services/common/models/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { SingleOrder } from '../../contracts/order/single_order';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';
import { SpinnerType } from '../../base/base.component';

@Component({
  selector: 'app-order-detail-dialog',
  standalone: false,
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.scss'
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService) {
    super(dialogRef)
  }

  singleOrder: SingleOrder;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number = 0;

  async ngOnInit(): Promise<void> {
    this.singleOrder = await this.orderService.getOrderById(this.data as string);
    this.dataSource = this.singleOrder.basketItems;

    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current, 0);
  }



  formatPrice(price: number | null): string {
    if (price == null) return 'Fiyat yok';
    return Number.isInteger(price) ? `${price} TL` : `${price.toFixed(2)} TL`;
  }

  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallPulseSync);
        await this.orderService.completeOrder(this.data as string);
        this.spinner.hide(SpinnerType.BallPulseSync); 
        this.toastrService.message("Sipariş başarıyla tamamlandı.", "Başarılı", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
      }
    });
  }


}

export enum OrderDetailDialogState {
  Close,
  OrderComplete
}




