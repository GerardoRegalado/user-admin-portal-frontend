import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }) {
    return this.http.post<{ token: string; user: any }>(`${this.base}/login`, payload)
      .pipe(tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
