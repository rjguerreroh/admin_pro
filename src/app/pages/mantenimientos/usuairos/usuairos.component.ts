import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuairos',
  templateUrl: './usuairos.component.html',
  styles: ``
})
export class UsuairosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService:BusquedasService,
    private modalImagenService:ModalImagenService
  ) {
  
  }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  abrirModal(usuario: Usuario){
    const id = usuario.uid || '';
    this.modalImagenService.abrirModal("usuarios", id, usuario.img );
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      })
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe( img => this.cargarUsuarios());
  }

  buscar( termino: string ): void{
    if (termino.length === 0){
      this.usuarios = [...this.usuariosTemp];
    }else{
      this.busquedasService.buscar('usuarios', termino)
        .subscribe((resultados: any[]) => {
          this.usuarios = resultados;
        })
    }
  }

  eliminarUsuario( usuario: Usuario ) {
    if( usuario.uid === this.usuarioService.uid ) {
      Swal.fire('Error', 'No puede borrarse àsi mismo', 'error');
    }else{
      Swal.fire({
        title: "¿Borrar usuario?",
        text: `Esta a punto de borrar a ${ usuario.nombre }`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Si, borrarlo"
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario( usuario).subscribe(res => {
            Swal.fire(
              'Usuario Borrado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            );
  
            this.cargarUsuarios();
          });
        }
      });
    }
  }

  cambiarRole( usuario: Usuario ){
    this.usuarioService.guardarUsuario(usuario).subscribe(res => {
      console.log("res", res);
    });
  }

}
