import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = `${environment.apiUrl}/api/products`;
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<Product[]>(this.base); }
  getById(id: string) { return this.http.get<Product>(`${this.base}/${id}`); }
  create(data: Product) { return this.http.post<Product>(this.base, data); }
  update(id: string, data: Partial<Product>) { return this.http.put<Product>(`${this.base}/${id}`, data); }
  delete(id: string) { return this.http.delete(`${this.base}/${id}`); }
}
