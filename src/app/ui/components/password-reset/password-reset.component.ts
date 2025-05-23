import { Component } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-password-reset',
  standalone: false,
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private alertifyService: AlertifyService) {
    super(spinner);
  }

  passwordReset(email: string) {
    this.userAuthService.passwordReset(email, () => this.alertifyService.message("Şifre sıfırlama talebiniz alınmıştır. Lütfen e-posta adresinizi kontrol ediniz.", {
      messageType: MessageType.Success,
      position: Position.TopCenter
    }));
  }

}
