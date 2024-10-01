import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuairosComponent } from './mantenimientos/usuairos/usuairos.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { adminGuard } from '../guards/admin.guard';

const routes: Routes = [
  { 
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ authGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'grafica1'} },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta'} },
      { path: 'buscar/:termino', component: BusquedasComponent, data: { titulo: 'Busquedas'} },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario'} },

      // Mantenimientos
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medicos'} },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales'} },

      // Rutas administrativas
      { path: 'usuarios', canActivate: [adminGuard], component: UsuairosComponent, data: { titulo: 'Usuarios de aplicacion'} },
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }