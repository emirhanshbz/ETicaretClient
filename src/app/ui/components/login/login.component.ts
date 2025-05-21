import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router'
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userAuthService: UserAuthService, spinner: NgxSpinnerService, private authService: AuthService ,private router: Router, private activatedRoute: ActivatedRoute, private socialAuthService: SocialAuthService) {
    super(spinner);
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.Fire);
      await userAuthService.googleLogin(user, () => {
        this.authService.identityCheck();
        this.router.navigate(["/"]);
        this.hideSpinner(SpinnerType.Fire)
      });
    });
   }

  ngOnInit(): void {
      
  }

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.Fire);
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();
      this.router.navigate(["/"]);

      this.activatedRoute.queryParamMap.subscribe(params => {
        params.get("returnUrl") ? this.router.navigate([params.get("returnUrl")]) : this.router.navigate(["/"]);
      })
      this.hideSpinner(SpinnerType.Fire)
    });
  }

  
}
