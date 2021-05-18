import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  countData : any;
  constructor(private httpService : HttpService) { }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(){
    this.httpService.get('product/dashboard').subscribe((result)=>{
      this.countData = result.body;
    }, (error) => {
      console.log(error);
    })
  }

}
