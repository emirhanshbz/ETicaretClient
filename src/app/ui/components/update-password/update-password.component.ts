import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { UserService } from '../../../services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  standalone: false,
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private activatedRoute: ActivatedRoute, private alertifyService: AlertifyService, private userService: UserService, private router: Router) {
    super(spinner);
  }

  state: any;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Fire);
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
          this.hideSpinner(SpinnerType.Fire);
        });
      }
    });
  }

  updatePassword(password: string, passwordConfirm: string) {
    this.showSpinner(SpinnerType.Fire);
    if (password != passwordConfirm) {
      this.alertifyService.message("Şifreler uyuşmuyor", {
        messageType: MessageType.Warning,
        position: Position.BottomCenter
      });
      this.hideSpinner(SpinnerType.Fire);
      return;
    }

    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userService.updatePassword(userId, resetToken, password, passwordConfirm,
          () => {
            this.alertifyService.message("Şifre başarıyla güncellenmiştir", {
              messageType: MessageType.Success,
              position: Position.TopRight
            })
            this.router.navigate(["/login"]);
          },
          error => {

          });
        this.hideSpinner(SpinnerType.Fire);
      }
    });

  }

}
