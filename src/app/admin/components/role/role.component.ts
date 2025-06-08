import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { BaseComponent } from '../../../base/base.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-role',
  standalone: false,
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdRole(createdRole: string){
    this.listComponents.getRoles();
  }
}
