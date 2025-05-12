import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("You are not authorized to access this resource.", "Unauthorized", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;

        case HttpStatusCode.Forbidden:
          this.toastrService.message("You do not have permission to perform this action.", "Forbidden", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;

        case HttpStatusCode.NotFound:
          this.toastrService.message("The requested resource could not be found.", "Not Found", {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.BottomFullWidth
          });
          break;

        case HttpStatusCode.BadRequest:
          this.toastrService.message("Invalid request. Please check your input.", "Bad Request", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;

        case HttpStatusCode.InternalServerError:
          this.toastrService.message("An unexpected server error occurred. Please try again later.", "Server Error", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.BottomFullWidth
          });
          break;

        case HttpStatusCode.ServiceUnavailable:
          this.toastrService.message("The server is temporarily unavailable. Please try again later.", "Service Unavailable", {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.BottomFullWidth
          });
          break;

        case 0: // Network error or CORS issue
          this.toastrService.message("Could not connect to the server. Please check your internet connection.", "Connection Error", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.BottomFullWidth
          });
          break;

        default:
          this.toastrService.message("An unexpected error occurred.", "Error", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.BottomFullWidth
          });
          break;
      }

      console.log('Error occurred:', error);
      return of(error);
    }));
  }
}
