import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from '../../models/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private base = `${environment.apiUrl}/api/categories`;
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<Category[]>(this.base); }
  getById(id: string) { return this.http.get<Category>(`${this.base}/${id}`); }
  create(data: Category) { return this.http.post<Category>(this.base, data); }
  update(id: string, data: Partial<Category>) { return this.http.put<Category>(`${this.base}/${id}`, data); }
  delete(id: string) { return this.http.delete(`${this.base}/${id}`); }
}
