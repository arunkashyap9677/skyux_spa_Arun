import { CommonModule } from '@angular/common';
import {
  NgModule
} from '@angular/core';

import {
  SkyAvatarModule
} from '@skyux/avatar';
import { SkyGridModule } from '@skyux/grids';

import {
  SkyAlertModule,
  SkyIconModule,
  SkyKeyInfoModule
} from '@skyux/indicators';

import {
  SkyCardModule,
  SkyFluidGridModule,
  SkyToolbarModule
} from '@skyux/layout';
import { SkyConfirmModule } from '@skyux/modals';

import {
  SkyNavbarModule
} from '@skyux/navbar';
import { SkyAppLinkModule } from '@skyux/router';
import { SkyThemeModule } from '@skyux/theme';
import { SkyToastModule } from '@skyux/toast';

@NgModule({
  exports: [
    SkyAvatarModule,
    SkyAlertModule,
    SkyKeyInfoModule,
    SkyFluidGridModule,
    SkyNavbarModule,
    SkyCardModule,
    SkyAppLinkModule,
    SkyGridModule,
    CommonModule,
    SkyToolbarModule,
    SkyIconModule,
    SkyThemeModule,
    SkyToastModule,
    SkyConfirmModule
  ]
})
export class AppSkyModule { }
