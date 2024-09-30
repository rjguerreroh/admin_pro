import { Component } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay, Subscription } from 'rxjs';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})
export class MedicosComponent {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        console.log("medicos", medicos)
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
      });
  }

  buscar(termino: string): void {
    if (termino.length === 0) {
      this.medicos = [...this.medicosTemp];
    } else {
      this.busquedasService.buscar('medicos', termino)
        .subscribe(resultados => {
          this.medicos = resultados;
        })
    }
  }

  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos', medico._id || '', medico.img);
  }
  
  async abrirSweetAlert(){
    console.log("sweeet alert")
    const { value } = await Swal.fire<string>({
      input: "text",
      inputLabel: "Ingrese el nombre del nuevo hospital",
      inputPlaceholder: "Nombre del hospital",
      showCancelButton: true
    }) ;
  }

  borrarMedico(medico: Medico){
    Swal.fire({
      title: "¿Borrar medico?",
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, borrarlo"
    }).then((result) => {
      if(result.value){
        this.medicoService.borrarMedico( medico._id || '' ).subscribe(res => {
          this.cargarMedicos();
          Swal.fire(
            'Medico Borrado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }


}
