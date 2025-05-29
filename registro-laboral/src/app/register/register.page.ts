import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: false,
})
export class RegisterPage {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private auth: AuthService, private navCtrl: NavController) {}

  async register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const success = await this.auth.register(this.username, this.password);
    if (success) {
      this.navCtrl.navigateRoot('/login');
    } else {
      this.errorMessage = 'No se pudo registrar';
    }
  }
}
