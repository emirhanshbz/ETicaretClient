import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientService } from './services/common/http-client.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router, private socialAuthService: SocialAuthService) {
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
}