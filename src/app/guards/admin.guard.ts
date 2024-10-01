import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router: Router = inject(Router);

  if( usuarioService.role === 'ADMIN_ROLE' ) {
    return true;
  }else{
    router.navigateByUrl('/dashboard');
    return false;
  }
};
