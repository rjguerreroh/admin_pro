import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/resgister-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


declare const google: any;
declare const gapi: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone ) {
    /* this.googleInit(); */
  }

  googleInit() {
    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '767525338723-88s768ksso69t91difho6n83d588r9jl.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })

  }

  logout(){
    localStorage.removeItem('token');
    google.accounts.id.revoke( 'rjguerreroh@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
/*       this.auth2.signOut().then(() => {

        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        })
      }); */

  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( error => of(false))
    );
  }

  crearUsuario( formData: RegisterForm ) {
    console.log("formaDaa", formData);
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    )
  }

  login( formData: LoginForm){
    return this.http.post(`${ base_url}/login`, formData).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle( token: string ){
    return this.http.post(`${ base_url }/login/google`, { token }).pipe(
      tap( (resp: any) => {
        console.log(resp)
        localStorage.setItem('token', resp.token);
      })
    )
  }
}
