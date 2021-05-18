import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  route_name = '';
  constructor(private router: Router) {
    this.route_name = this.router.url;
  }

  ngOnInit(): void {
    // this.router.events.subscribe(val => {
    //   console.log(location);
    // });
  }

}
