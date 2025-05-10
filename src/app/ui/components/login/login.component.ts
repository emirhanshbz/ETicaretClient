import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UserService, spinner: NgxSpinnerService, private authService: AuthService ,private router: Router, private activatedRoute: ActivatedRoute) {
    super(spinner);
   }

  ngOnInit(): void {
      
  }

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.Fire);
    await this.userService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();
      this.router.navigate(["/"]);

      this.activatedRoute.queryParamMap.subscribe(params => {
        params.get("returnUrl") ? this.router.navigate([params.get("returnUrl")]) : this.router.navigate(["/"]);
      })
      this.hideSpinner(SpinnerType.Fire)
    });
  }
}
