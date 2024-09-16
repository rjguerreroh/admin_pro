import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { LoginForm } from '../../interfaces/login-form.interface';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn?: ElementRef;
  public formSubmitted = false;
  public auth2: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '767525338723-88s768ksso69t91difho6n83d588r9jl.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    console.log("Encoded JWT ID Token: ", response.credential );
    this.usuarioService.loginGoogle(response.credential).subscribe( resp => {
      console.log("login", resp);
      this.router.navigateByUrl('/');
    });
  }

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', Validators.required],
    password: ['', Validators.required],
    remember: [false]
  });

  ngOnInit(): void {
  }

  login() {
    // Asegúrate de que los valores del formulario nunca sean null o undefined
    const formValues = {
      email: this.loginForm?.value.email ?? "",
      password: this.loginForm?.value.password ?? ""
    };

    // Envía los valores directamente al servicio
    this.usuarioService.login(formValues).subscribe({
      next: (response) => {
        if (this.loginForm.get('remember')?.value){
          localStorage.setItem('email', formValues.email);
        }else{
          localStorage.removeItem('email');
        }
        // Manejar la respuesta del login exitoso
        console.log('Login successful', response);
        // Navegar si es necesario
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        // Manejar errores del login
        console.error('Login failed', err);
      }
    });
    /* this.router.navigateByUrl('/'); */
  }

  async startApp() {
    
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
    
  };

  attachSignin(element: any) {
    
    this.auth2.attachClickHandler( element, {},
        (googleUser: any) => {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token);
            this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                })
              });

        }, (error: any) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }

}