// src/app/pages/products/products-list/products-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntityCardComponent } from "../../../shared/components/Card/card.component";
import { ModalComponent } from "../../../shared/components/Modal/modal.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  imports: [CommonModule, FormsModule, EntityCardComponent, ModalComponent]
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  selectedProduct: Product | null = null;
  modalVisible = false;
  modalMode: 'create' | 'edit' | 'confirm' | 'view' = 'create';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error cargando productos';
        this.loading = false;
      }
    });
  }

openModal(mode: typeof this.modalMode, product?: Product) {
  this.modalMode = mode;

  if (mode === 'create') {
    this.selectedProduct = {
      name: '',
      description: '',
      price: 0,
      category: ''
    };
  } else {
    this.selectedProduct = product ?? null;
  }

  this.modalVisible = true;
}


  closeModal() {
    this.modalVisible = false;
    this.selectedProduct = null;
  }

  handleSave(product: Product) {
    const op = product._id
      ? this.productService.update(product._id, product)
      : this.productService.create(product);

    op.subscribe(() => {
      this.load();
      this.closeModal();
    });
  }

  handleDelete(id: string) {
    this.productService.delete(id).subscribe(() => this.load());
  }
}
