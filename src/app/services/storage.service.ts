import { Injectable } from '@angular/core';
import { AuthConstants } from '../config/AuthConstants';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localStorage: Storage;

  constructor(private jwtHelper:JwtHelperService) {
    this.localStorage = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      const res = this.localStorage.getItem(key);
      if(res){
        return JSON.parse(unescape(atob(this.localStorage.getItem(key))));
      }else{
        return false;
      }
    }
    return false;
  }

  set(key: string, value: any){
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, encryptedValue);
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(){
    if (this.isLocalStorageSupported) {
      this.localStorage.clear();
      return true;
    }
    return false;
  }

  isLoggedIn(){
    if (this.isLocalStorageSupported) {
      let isTokenExist = false;
      let key = this.get(AuthConstants.JWT_KEY);
      if(key){
        isTokenExist = this.jwtHelper.isTokenExpired(key);
      }

      const res = this.localStorage.getItem(AuthConstants.LOGIN_KEY);
      if(res && !isTokenExist){
        return true;
      }else{
        return false;
      }
    }
    return false;
  }

  isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}
