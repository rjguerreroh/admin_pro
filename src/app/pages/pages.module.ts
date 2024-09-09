import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { BaseChartDirective  } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
  /**
   * Cuando se usa declarations esto permite que el uso de los componentes dentro del mismo modulo
   */
  declarations: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    Grafica1Component,
    AccountSettingsComponent,
  ],
  /**
   * Cuando se usa el exports otros modulos prodran usar los componentes del modulo que emite los componentes
   */
  exports: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    Grafica1Component,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    BaseChartDirective,
    ComponentsModule
  ]
})
export class PagesModule { }
