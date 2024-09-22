import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})
export class ModalImagenComponent {
  public imagenSubir!: File;
  public imgTemp: any
  public usuario!: Usuario;
  ;

  constructor(
    public modalImagenService: ModalImagenService,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ){

  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.imgTemp = null;
      return;
    }

    const file = input.files[0];
    this.imagenSubir = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
        Swal.fire('Error', err.error.msg, 'error');
        console.log(err.error.msg);
      });
  }

}
