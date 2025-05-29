import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class SQLiteService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.init();
  }

  async init() {
    try {
      this.db = await this.sqlite.createConnection(
        'registro_db',
        false,
        'no-encryption',
        1,
        false
      );
      await this.db.open();

      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT
        );
      `);

      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS registros (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          tipo TEXT,
          fecha TEXT,
          lat REAL,
          lon REAL,
          foto TEXT
        );
      `);
    } catch (e) {
      console.error('Error inicializando DB:', e);
    }
  }

  async registrar(
    userId: number,
    tipo: string,
    lat: number,
    lon: number,
    foto: string
  ) {
    const fecha = new Date().toISOString().split('T')[0];

    await this.db?.run(
      'INSERT INTO registros (userId, tipo, fecha, lat, lon, foto) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, tipo, fecha, lat, lon, foto]
    );
  }

  async hasRegistroToday(userId: number, tipo: string): Promise<boolean> {
    const fecha = new Date().toISOString().split('T')[0];
    const result = await this.db?.query(
      'SELECT * FROM registros WHERE userId = ? AND tipo = ? AND fecha = ?',
      [userId, tipo, fecha]
    );
    return (result?.values?.length ?? 0) > 0;
  }

  async registrarUsuario(username: string, password: string) {
    await this.db?.run('INSERT INTO users (username, password) VALUES (?, ?)', [
      username,
      password,
    ]);
  }

  async login(username: string, password: string): Promise<number | null> {
    const result = await this.db?.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    return result?.values?.length ? result.values[0].id : null;
  }
}
