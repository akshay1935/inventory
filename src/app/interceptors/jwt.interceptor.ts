import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthConstants } from '../config/AuthConstants';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private storageService:StorageService, private jwtHelper:JwtHelperService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isLoggedIn = this.storageService.get(AuthConstants.LOGIN_KEY) && !this.jwtHelper.isTokenExpired(this.storageService.get(AuthConstants.JWT_KEY));
    const isApiUrl = request.url.startsWith(environment.API_URL);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${this.storageService.get(AuthConstants.JWT_KEY)}`
          }
      });
    }
    return next.handle(request);
  }
}
