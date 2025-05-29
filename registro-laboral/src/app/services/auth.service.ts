import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private db: SQLiteService,
    private storage: StorageService,
    private navCtrl: NavController
  ) {}

  async register(username: string, password: string): Promise<boolean> {
    try {
      await this.db.registrarUsuario(username, password);
      return true;
    } catch (error) {
      console.error('Error al registrar usuario', error);
      return false;
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    const userId = await this.db.login(username, password);
    if (userId) {
      await this.storage.set('userId', userId);
      this.navCtrl.navigateRoot('/home');
      return true;
    }
    return false;
  }

  async logout() {
    await this.storage.remove('userId');
    this.navCtrl.navigateRoot('/login');
  }

  async getCurrentUserId(): Promise<number | null> {
    return await this.storage.get('userId');
  }
}
