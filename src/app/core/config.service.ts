import { Injectable } from '@angular/core';
import { Config } from './config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private config: Config) {}

  public getConfig() {
    return this.config;
  }
}
