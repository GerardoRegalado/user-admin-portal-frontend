import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../models/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/components/Modal/modal.component'; // Reutilizable
import { EntityCardComponent } from '../../../shared/components/Card/card.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  imports: [CommonModule, FormsModule, ModalComponent, EntityCardComponent]
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  loading = false;
  error = '';
  selectedCategory: Category | null = null;
  modalVisible = false;
  modalMode: 'create' | 'edit' | 'confirm' | 'view' = 'create';

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error cargando categorías';
        this.loading = false;
      }
    });
  }

openModal(mode: typeof this.modalMode, category?: Category) {
  this.modalMode = mode;

  if (mode === 'create') {
    this.selectedCategory = {
      name: '',
      description: ''
    };
  } else {
    this.selectedCategory = category ?? null;
  }

  this.modalVisible = true;
}


  closeModal() {
    this.modalVisible = false;
    this.selectedCategory = null;
  }

  handleSave(category: Category) {
    const op = category._id
      ? this.categoryService.update(category._id, category)
      : this.categoryService.create(category);

    op.subscribe(() => {
      this.load();
      this.closeModal();
    });
  }

  handleDelete(id: string) {
    this.categoryService.delete(id).subscribe(() => this.load());
  }
}
