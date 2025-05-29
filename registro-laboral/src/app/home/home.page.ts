import { Component } from '@angular/core';
import { SQLiteService } from '../services/sqlite.service';
import { GeoService } from '../services/geo.service';
import { CameraService } from '../services/camera.service';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: false,
})
export class HomePage {
  userId: number | null = null;

  constructor(
    private db: SQLiteService,
    private geo: GeoService,
    private cam: CameraService,
    private auth: AuthService,
    private navCtrl: NavController
  ) {}

  async ionViewWillEnter() {
    this.userId = await this.auth.getCurrentUserId();
    if (!this.userId) {
      this.navCtrl.navigateRoot('/login');
    }
  }

  async registrar(tipo: 'entrada' | 'salida') {
    if (!this.userId) return;

    const yaRegistrado = await this.db.hasRegistroToday(this.userId, tipo);
    if (yaRegistrado) {
      alert(`Ya has registrado tu ${tipo} hoy.`);
      return;
    }

    const ubicacion = await this.geo.isInAuthorizedZone();
    if (!ubicacion.authorized) {
      alert('Estás fuera del área permitida.');
      return;
    }

    const foto = await this.cam.takePicture();
    await this.db.registrar(
      this.userId,
      tipo,
      ubicacion.lat,
      ubicacion.lon,
      foto
    );
    alert(
      `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrada con éxito.`
    );
  }

  logout() {
    this.auth.logout();
  }
}
