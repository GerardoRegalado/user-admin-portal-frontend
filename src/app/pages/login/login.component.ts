import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
disclaimerVisible = false;
model = {
  name: 'El backend está corriendo en la versión gratuita de Render.com. La primer petición puede tardar hasta 50 segundos. Gracias por tu paciencia.'
};
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

ngOnInit(): void {
  this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  const seen = localStorage.getItem('disclaimer_seen');
  if (!seen) {
    this.disclaimerVisible = true;
    localStorage.setItem('disclaimer_seen', 'true');
  }
}

  submit() {
    console.log('hola')
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/users']),
      error: err => {
        this.error = err?.error?.message || 'Error al iniciar sesión';
        this.loading = false;
      }
    });
  }
}
