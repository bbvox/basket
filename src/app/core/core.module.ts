import {
  NgModule,
  APP_INITIALIZER,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [{ provide: 'Window', useValue: window }],
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
