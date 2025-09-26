import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  ButtonDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormTextDirective,
  SidebarComponent,
  SidebarHeaderComponent,
  SidebarBrandComponent,
  NavComponent,
  NavItemComponent,
  ContainerComponent,
  SidebarNavComponent,
  SidebarNavHelper,
  SidebarModule,
  FooterComponent
} from '@coreui/angular';
import { UserCardComponent } from './shared/components/Card/card.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
     MainLayoutComponent,
    AuthLayoutComponent,
    CategoriesListComponent,
    ProductsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormTextDirective,
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    NavComponent,
    NavItemComponent,
    ContainerComponent,
    SidebarNavComponent,
    SidebarModule,
    FooterComponent,
    FormsModule,
    UserCardComponent
],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
