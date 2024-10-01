import { Injectable } from '@angular/core';
interface SidebarMenuItem {
  icono: string;
  titulo: string;
  submenu: { titulo: string; url: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: SidebarMenuItem[] = [];

  constructor() { }

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
  }

  /* menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/'},
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Graficas', url: 'grafica1'},
        { titulo: 'rxjs', url: 'rxjs'},
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios'},
        { titulo: 'Hospitales', url: 'hospitales'},
        { titulo: 'Medicos', url: 'medicos'},
      ]
    },
  ] */
}
