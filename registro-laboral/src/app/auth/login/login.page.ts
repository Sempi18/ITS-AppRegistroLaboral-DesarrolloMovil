import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    const success = await this.auth.login(this.username, this.password);
    if (!success) {
      this.errorMessage = 'Credenciales incorrectas';
    } else {
      this.router.navigate(['/home']);
    }
  }
}
