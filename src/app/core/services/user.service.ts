import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = `${environment.apiUrl}/api/users`;
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<User[]>(this.base); }
  getById(id: string) { return this.http.get<User>(`${this.base}/${id}`); }
  create(data: User)  { return this.http.post(`${this.base}/register`, data); }
  update(id: string, data: Partial<User>) { return this.http.put(`${this.base}/${id}`, data); }
  delete(id: string)  { return this.http.delete(`${this.base}/${id}`); }
}
