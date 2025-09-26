import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { AuthGuard } from './core/guards/auth.guard';
const routes: Routes = [
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  // 👉 Layout para las rutas protegidas con navbar
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersListComponent },
      { path: 'categories', component: CategoriesListComponent },
      { path: 'products', component: ProductsListComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' } // Home por defecto
    ]
  },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
