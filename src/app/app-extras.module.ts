import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSkyModule } from './app-sky.module';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './shared/components/button-renderer/button-renderer.component';
import { SkyHttpInterceptor } from './shared/interceptors/SkyHttpInterceptor';
import { Name, Name2, NAMETOKEN } from './shared/models/Name';

export function Loader(){
  return () => {
    console.log('App Initialized...');
    return Promise.resolve();
  };
}

@NgModule({
  imports: [
    AgGridModule.withComponents([ButtonRendererComponent])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SkyHttpInterceptor, multi: true},
    { provide: APP_INITIALIZER, useFactory: Loader,  multi: true },
    { provide: 'NAME_TOKEN', useClass: Name },
    { provide: 'NAME_TOKEN', useClass: Name2 },
    { provide: NAMETOKEN, useValue: "NAME TOKEN FROM MODULE" },
  ],
  exports: [
    AppSkyModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule
  ]
})
export class AppExtrasModule { }
