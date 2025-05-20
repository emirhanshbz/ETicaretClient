import { Component, ViewChild } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;


    constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router, private socialAuthService: SocialAuthService, private dynamicLoadComponentService: DynamicLoadComponentService) {
      authService.identityCheck();
    }

  signOut() {
    this.socialAuthService.signOut();
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate(["/"]);
    this.toastrService.message("Çıkış yapıldı", "Bilgilendirme", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    })
  }


  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, 
      this.dynamicLoadComponentDirective.viewContainerRef)
  }
}