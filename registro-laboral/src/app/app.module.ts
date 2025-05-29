import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { SQLiteService } from './services/sqlite.service';
import { GeoService } from './services/geo.service';
import { CameraService } from './services/camera.service';
import { StorageService } from './services/storage.service';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ 
    AuthService,
    SQLiteService,
    GeoService,
    CameraService,
    StorageService
    provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
