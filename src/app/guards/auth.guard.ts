import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router: Router = inject(Router);
  return usuarioService.validarToken().pipe(
    tap(
      (isAuth: boolean) => {
        if( !isAuth ){
          router.navigateByUrl('/login');
        }
      }
    )
  ); // aqui no esta subcrito, pero guard controla el observable por debajo
};
