import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isRegisterMode = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    this.username = '';
    this.password = '';
  }

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      console.log('Login successful, navigating to students...');
      this.router.navigate(['/students']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  onRegister() {
    if (this.authService.register(this.username, this.password)) {
      this.errorMessage = '';
      alert('Registration successful! Please login.');
      this.toggleMode();
    } else {
      this.errorMessage = 'Username already exists';
    }
  }
}
