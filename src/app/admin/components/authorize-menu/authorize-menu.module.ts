import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { RouterModule } from '@angular/router';
import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: AuthorizeMenuComponent}, //"customer" customer diye bir istek gelirse CustomerComponent'i çalıştır
    ]),
    MatTreeModule,
    MatIconModule
  ]
})
export class AuthorizeMenuModule { }
