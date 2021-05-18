import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddEditProductComponent, ListProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }
