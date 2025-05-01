import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent{
  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(spinnerNameType: SpinnerType) {
      this.spinner.show(spinnerNameType);

      setTimeout(() => this.hideSpinner(spinnerNameType), 100);
  }

  hideSpinner(spinnerNameType: SpinnerType) {
    this.spinner.hide(spinnerNameType);
}
}

export enum SpinnerType {
  Fire = "s1",
  BallPulseSync = "s2",
  BallSpinClockwiseFade = "s3"
}
