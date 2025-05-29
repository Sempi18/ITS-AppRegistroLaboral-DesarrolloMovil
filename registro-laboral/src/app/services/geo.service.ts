import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({ providedIn: 'root' })
export class GeoService {
  // Ubicación permitida (coordenadas del lugar de trabajo por ejemplo)
  private authorizedLat = -34.6037; // cambiar por tu ubicación
  private authorizedLon = -58.3816;
  private maxDistanceMeters = 150;

  async isInAuthorizedZone(): Promise<{
    authorized: boolean;
    lat: number;
    lon: number;
  }> {
    const coords = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = coords.coords;

    const distance = this.calculateDistance(
      latitude,
      longitude,
      this.authorizedLat,
      this.authorizedLon
    );
    const authorized = distance <= this.maxDistanceMeters;

    return { authorized, lat: latitude, lon: longitude };
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371e3;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
