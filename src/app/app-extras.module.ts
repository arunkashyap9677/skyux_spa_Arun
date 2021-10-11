import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSkyModule } from './app-sky.module';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './shared/components/button-renderer/button-renderer.component';

@NgModule({
  imports: [
    AgGridModule.withComponents([ButtonRendererComponent])
  ],
  exports: [
    AppSkyModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule
  ]
})
export class AppExtrasModule { }
