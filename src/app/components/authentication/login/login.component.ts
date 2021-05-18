import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/config/AuthConstants';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(
    private httpService : HttpService,
    private storageService : StorageService,
    private router : Router,
    private toastr : ToastrService
    ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username':new FormControl(null, Validators.required), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
      'password':new FormControl(null, Validators.required)
    })
  }

  submitForm(): void {
    if(this.loginForm.valid){
      this.httpService.post('token/generate-token',this.loginForm.value).subscribe((result)=>{
        this.storageService.set(AuthConstants.LOGIN_KEY,1);
        this.storageService.set(AuthConstants.JWT_KEY,result.body.token);
        this.router.navigate(['home']);
      },(err)=>{
        if(err.status == 401){
          this.toastr.error("Invalid Credentials","error");
        }
      });
    }
  }

}
