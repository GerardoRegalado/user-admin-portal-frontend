import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user';
import { EntityCardComponent } from "../../../shared/components/Card/card.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/components/Modal/modal.component';


@Component({
selector: 'app-users-list',
templateUrl: './users-list.component.html',
imports: [FormsModule, EntityCardComponent,CommonModule, ModalComponent],
standalone: true
})
export class UsersListComponent implements OnInit {
public rows: User[] = [];
public loading = false;
public error = '';
public showCreateModal = false;
public newUser: User = { name: '', username: '', email: '', password: '' };
public showModal = false;
public modalMode: 'create' | 'edit' | 'view' | 'confirm' = 'create';
public modalTitle = '';
public dangerMode = false;
public selectedUser: User = { name: '', username: '', email: '', password: '' };
public selectedUserDetails: User | null = null;
public showDetailsModal = false;



constructor(private users: UserService) {}


ngOnInit() {
this.load();
console.log(this.rows)
}


load() {
this.loading = true;
this.users.getAll().subscribe({
next: (data) => {
  console.log(data)
this.rows = data;
this.loading = false;
},
error: (err) => {
this.error = err?.error?.message || 'Error cargando usuarios';
this.loading = false;
}
});
}

handleCreate() {
  this.users.create(this.newUser).subscribe({
    next: () => {
      this.load(); // recarga lista
      this.newUser = { name: '', username: '', email: '', password: '' };
      this.showCreateModal = false;
    },
    error: (err) => {
      this.error = err?.error?.message || 'Error creando usuario';
    }
  });
}





handleUpdate(user: User) {
  if (!user._id) return;

  this.loading = true;

  this.users.update(user._id, user).subscribe({
    next: () => {
      this.load(); // Recarga los datos actualizados
      this.showModal = false;
      this.loading = false;
    },
    error: (err) => {
      this.error = err?.error?.message || 'Error al actualizar usuario';
      this.loading = false;
    }
  });
}


openCreateModal() {
  this.modalMode = 'create';
  this.modalTitle = 'Crear nuevo usuario';
  this.dangerMode = false;
  this.selectedUser = { name: '', username: '', email: '', password: '' };
  this.showModal = true;
}

openEditModal(user: User) {
  this.modalMode = 'edit';
  this.modalTitle = 'Editar usuario';
  this.dangerMode = false;
  this.selectedUser = { ...user };
  this.showModal = true;
}

openDeleteModal(user: User) {
  this.modalMode = 'confirm';
  this.modalTitle = `Eliminar a ${user.name}?`;
  this.dangerMode = true;
  this.selectedUser = { ...user };
  this.showModal = true;
}

handleModalConfirm(data: User | true) {
  if (this.modalMode === 'create') {
    this.users.create(data as User).subscribe(() => this.load());
  }
  else if (this.modalMode === 'edit') {
    const user = data as User;
    this.users.update(user._id!, user).subscribe(() => this.load());
  }
  else if (this.modalMode === 'confirm') {
    this.users.delete(this.selectedUser._id!).subscribe(() => this.load());
  }

  this.showModal = false;
}

openDetailsModal(id: string) {
  // Establecemos el modo y el título desde el principio
  this.modalMode = 'view';
  this.modalTitle = 'Detalles del usuario';
  this.dangerMode = false;

  // Marcamos el modal como visible
  this.showModal = true;
  this.showDetailsModal = false;

  this.users.getById(id).subscribe({
    next: (user) => {
      this.selectedUser = { ...user }; // este es el que se pasa al modal
    },
    error: () => {
      this.error = 'No se pudo cargar el usuario.';
    }
  });
}



closeModal() {

  this.showModal = false;
  this.selectedUser = { name: '', username: '', email: '', password: '' };

}

}
