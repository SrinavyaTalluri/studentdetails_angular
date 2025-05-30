import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface User {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = false;
  users: User[] = [];

  constructor(private router: Router) {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  register(username: string, password: string): boolean {
    if (this.users.find(u => u.username === username)) {
      return false;
    }
    this.users.push({ username, password });
    this.saveUsers();
    return true;
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
