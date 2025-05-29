import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

// Servicios
import { AuthService } from './services/auth.service';
import { SQLiteService } from './services/sqlite.service';
import { GeoService } from './services/geo.service';
import { CameraService } from './services/camera.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    SQLiteService,
    GeoService,
    CameraService,
    StorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
