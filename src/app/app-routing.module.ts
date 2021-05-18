import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'authentication',
    canActivate : [LoginGuard],
    loadChildren: () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'login',
    canActivate : [LoginGuard],
    loadChildren: () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'product',
    canActivate : [AuthGuard],
    loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'shared',
    canActivate : [AuthGuard],
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    canActivate : [AuthGuard],
    path: 'home', component: HomeComponent
  },
  {path: '**', redirectTo: 'shared/404'},
  {path: 'shared/404', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
