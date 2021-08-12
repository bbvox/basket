import {
  NgModule,
  APP_INITIALIZER,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Config } from './config.model';

export let config: Config;

export const getConfig = (): Config => {
  if (!config) {
    throw new Error('config has not been set');
  }

  return config;
};

export const initConfig = () => async () => {
  const res = await fetch('assets/json/config.json');
  config = await res.json();
};

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    { provide: Config, useFactory: getConfig },
    { provide: APP_INITIALIZER, useFactory: initConfig, multi: true }
  ],

  exports: [],
})
export class CoreModule {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static ReactiveFormsModule: any;
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `Core module has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
    };
  }
}
