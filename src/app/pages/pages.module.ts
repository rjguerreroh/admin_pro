import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';




@NgModule({
  /**
   * Cuando se usa declarations esto permitira el uso de los componentes dentro del mismo modulo
   */
  declarations: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    Grafica1Component
  ],
  /**
   * Cuando se usa el exports otros modulos prodran usar los componentes del modulo que emite los componentes
   */
  exports: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    Grafica1Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
