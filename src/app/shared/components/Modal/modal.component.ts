import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface BaseEntity {
_id?: string;
name: string;
[key: string]: any;
}


@Component({
selector: 'app-modal',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './modal.component.html',
})
export class ModalComponent<T extends BaseEntity> {
@Input() title = '';
@Input() visible = false;
@Input() mode: 'view' | 'create' | 'edit' | 'confirm' = 'create';
@Input() model!: T;
@Input() danger = false;
@Input() type: 'user' | 'category' | 'product' | null = null;
@Input() entity!: any; // Category | Product | User, dependiendo del uso



@Output() onClose = new EventEmitter<void>();
@Output() onConfirm = new EventEmitter<T | true>();
@Output() onSave = new EventEmitter<any>();

ngOnChanges() {
  if (this.entity) {
    this.model = { ...this.entity };  // Fuerza la copia fresca
  }
}


confirm() {
  if (this.mode === 'confirm') {
    this.onConfirm.emit(true); // eliminar
  } else {
    this.onSave.emit(this.model); // guardar o editar
  }
}



}
