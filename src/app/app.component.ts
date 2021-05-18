import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'inventory';
  isLoggedIn = false;
  isNotFound = false;

  constructor(private storageService : StorageService,public router: Router){

  }

  ngOnInit(){
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.isNotFound = window.location.href.includes('404');
  }
}
