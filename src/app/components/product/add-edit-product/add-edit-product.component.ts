import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonConstants } from 'src/app/config/CommonConstants';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  isEdit = false;
  productData : any;
  productForm : FormGroup;
  routeState  : any;
  constructor(private httpService : HttpService, private toastr : ToastrService, private router: Router, private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('productId') !== null){
      this.route.queryParams.subscribe(data => {
        this.productData = data;
        this.productForm = new FormGroup({
          'name'       :new FormControl(this.productData.name, [Validators.required, Validators.pattern(CommonConstants.CHARACTER_REGEX)]), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
          'description':new FormControl(this.productData.description, Validators.required),
          'price'      :new FormControl(this.productData.price, [Validators.required, Validators.pattern(CommonConstants.DECIMAL_REGEX)]),
          'stockStatus':new FormControl(this.productData.stockStatus, Validators.required)
        });
        this.isEdit = true;
      });
    }else{
      this.productForm = new FormGroup({
        'name'       :new FormControl(null, [Validators.required, Validators.pattern(CommonConstants.CHARACTER_REGEX)]), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
        'description':new FormControl(null, Validators.required),
        'price'      :new FormControl(null, [Validators.required, Validators.pattern(CommonConstants.DECIMAL_REGEX)]),
        'stockStatus':new FormControl('AVAILABLE', Validators.required)
      });
    }
  }

  submitForm(){
    if(this.productForm.valid){
      if(this.isEdit){  /** update product */
        let data = {
          ...this.productForm.value,
          productId : this.productData.productId,
          status : 'ACTIVE'
        }
        this.httpService.put('product',data).subscribe((result) => {
          this.toastr.success('Product updated!');
          this.router.navigate(['/product/list-product']);
        },(error)=>{
          console.log(error)
        });
      }else{ /** add new product */
        let data = {
          ...this.productForm.value,
          status : 'ACTIVE'
        }
        this.httpService.post('product',data).subscribe((result) => {
          this.toastr.success('Product added!');
          this.router.navigate(['/product/list-product']);
        },(error)=>{
          console.log(error)
        });
      }

    }else{
      for (const i in this.productForm.controls) {
        this.productForm.controls[ i ].markAsDirty();
        this.productForm.controls[ i ].updateValueAndValidity();
      }
    }
  }

  changeStatus(e) {
    console.log(this.productForm.value);
  }

}
