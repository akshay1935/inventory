import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, OnDestroy, AfterViewInit {

  productList : Product[];
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpService : HttpService, private router : Router, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit(){
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }


  getProducts(){
    this.httpService.get('product').subscribe((result) => {
      this.productList = result.body;
      this.dtTrigger.next();
    },(error)=>{
      this.dtTrigger.next();
      console.log(error)
    });
  }

  editProduct(product){
    this.router.navigate(['/product/add-edit-product/'+product.productId], {
      queryParams: product
    });
  }

  deleteProduct(product){
    let data = {
      ...product,
      stockStatus : '-',
      status    : 'DISABALED'
    }
    this.httpService.put('product',data).subscribe((result) => {
      this.toastr.success('Product deleted!');
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.getProducts();
    },(error)=>{
      console.log(error)
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
