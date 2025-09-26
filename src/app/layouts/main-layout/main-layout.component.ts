import { Component } from '@angular/core';
import { AppRoutingModule } from "../../app-routing.module";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: false,

})
export class MainLayoutComponent {
  navItems = [
    {
      name: 'Usuarios',
      url: '/users',
      iconComponent: { name: 'cil-user' },
    },
    {
      name: 'Categorías',
      url: '/categories',
      iconComponent: { name: 'cil-list' },
    },
    {
      name: 'Productos',
      url: '/products',
      iconComponent: { name: 'cil-library' },
    },
  ];
}
