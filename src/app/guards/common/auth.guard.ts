import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { _isAuthenticated } from '../../services/common/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // const token: string = localStorage.getItem("accessToken");
      
      // //const decodeToken = this.jwtHelper.decodeToken(token);
      // //const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
      // let expired: boolean;
      // try {
      //   expired = this.jwtHelper.isTokenExpired(token);
      // } catch {
      //   expired = true;
      // }

      if(!_isAuthenticated) {
        this.router.navigate(["login"], { queryParams: { returnUrl: state.url}});
        this.toastrService.message("Oturum açmanız gerekiyor", "Yetkisiz Erişim", {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight
        })
      }

      //debugger;

      return true;
  }
}
