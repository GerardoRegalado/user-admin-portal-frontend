import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../models/category';


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

 public categories: Category[] = [];

@Output() onClose = new EventEmitter<void>();
@Output() onConfirm = new EventEmitter<T | true>();
@Output() onSave = new EventEmitter<any>();

  constructor(private categoryService: CategoryService) {}


ngOnChanges() {
  if (this.entity) {
    this.model = { ...this.entity };  // Fuerza la copia fresca
  }
}

  ngOnInit() {
    if (this.type === 'product') {
      this.categoryService.getAll().subscribe((res) => {
        this.categories = res;
      });
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
