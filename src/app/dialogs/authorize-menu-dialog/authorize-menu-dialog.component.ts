import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authorize-menu-dialog',
  standalone: false,
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrl: './authorize-menu-dialog.component.scss'
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit{
  
  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: any,
    private spinner: NgxSpinnerService) {
    super(dialogRef)
  }

  async ngOnInit() {
    
  }
}

export enum AuthorizeMenuState {
  Yes,
  No
}
