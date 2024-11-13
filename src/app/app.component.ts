import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule,CommonModule,MatMenuModule,MatToolbarModule,MatIconModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontDemo';
  
  role:string = '';
  constructor(private loginService: LoginService){}
  cerrar(){
    sessionStorage.clear();
  }
  verificar(){
    this.role= this.loginService.showRole();
    return this.loginService.verificar();
  }

  isAdmin(){
    return this.role === 'ADMIN';
  }
  isEspecialista(){
    return this.role === 'Especialista';
  }
}
