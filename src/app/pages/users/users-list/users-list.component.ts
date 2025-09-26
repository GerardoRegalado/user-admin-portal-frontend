import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  standalone: false
})
export class UsersListComponent implements OnInit {
  rows: User[] = [];
  loading = false;
  error = '';

  constructor(private users: UserService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.users.getAll().subscribe({
      next: data => { this.rows = data; this.loading = false; },
      error: err => { this.error = err?.error?.message || 'Error cargando usuarios'; this.loading = false; }
    });
  }
}
