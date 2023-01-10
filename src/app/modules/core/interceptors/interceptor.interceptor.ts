import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../services/auth.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken: any = localStorage.getItem('token');

    if (req.headers.get('skip')) return next.handle(req);

    if (accessToken) {
      const helper = new JwtHelperService();
      const tokenType = helper.decodeToken(accessToken).type;
      const cloned = req.clone({
        headers: req.headers.set('authorization', tokenType + " " + accessToken),
      });

      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse &&
            !cloned.url.includes('user/login') &&
            error.status == 401) {

            this._authService.refreshToken().subscribe({
              next: (result) => {
                localStorage.setItem("token",result.accessToken);
                localStorage.setItem("refreshToken",result.refreshToken);
                window.location.reload();
              }
            })
          }
          return throwError(() => error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
