import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
})
export class LoginComponent {
  loginObj: any = {
    "username": '',
    "password": '',
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.http.post('http://localhost:8080/login', this.loginObj).pipe(
      catchError((error) => {
        alert('Error en la conexión o en el servidor');
        this.router.navigateByUrl('dashboard')
        return of(null); 
      })
    ).subscribe((res: any) => {
      if (res && res.message === 'Se ha logeado correctamente') {
        alert('Login exitoso');
        localStorage.setItem('loginToken', res.jwttoken); 
        this.router.navigateByUrl('/dashboard');
      } else {
        alert('Login no exitoso');
      }
    });
  }
}
