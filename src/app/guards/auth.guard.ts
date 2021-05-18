import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthConstants } from '../config/AuthConstants';
import { StorageService } from '../services/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService : StorageService, private router : Router, private jwtHelper:JwtHelperService){}

  canActivate() : Promise<boolean>{
    return new Promise( resolve => {
      let isTokenExist = false;
      let key = this.storageService.get(AuthConstants.JWT_KEY);
      if(key){
        isTokenExist = this.jwtHelper.isTokenExpired(key);
      }

      if(this.storageService.get(AuthConstants.LOGIN_KEY) && !isTokenExist){
        resolve(true);
      }else{
        this.router.navigate(['authentication/login']);
        resolve(false);
      }
    });
  }
}
