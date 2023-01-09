import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class Interceptor implements HttpInterceptor {
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

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
