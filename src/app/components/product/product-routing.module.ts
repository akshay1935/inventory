import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ListProductComponent } from './list-product/list-product.component';


const routes: Routes = [
  { path: '', component: ListProductComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'add-edit-product', component: AddEditProductComponent },
  { path: 'add-edit-product/:productId', component: AddEditProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
