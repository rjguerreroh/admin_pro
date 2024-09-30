import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ``
})
export class MedicoComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital | null = null;
  public medicoSeleccionado: Medico | null = null;

  constructor(
    private medicoService: MedicoService,
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({id}) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
      .pipe( delay(100) )
      .subscribe( hospitalId => {
        const resp = this.hospitales.find(h => h._id === hospitalId);
        if (resp) {
          this.hospitalSeleccionado = resp;
          console.log("hospital seleccionado", resp);
        } else {
          console.log("Hospital no encontrado");
          this.hospitalSeleccionado = null; // o manejar el caso de otra manera
        }
      })
  }

  cargarMedico(id: string){
    if( id === 'nuevo'){
      return;
    }else{
      this.medicoService.obtenerMedicoPorId(id)
        .subscribe( medico => {
          console.log(medico);
          if(!medico){
            this.router.navigateByUrl(`/dashboard/medicos`);
          }else{
            const { nombre, hospital } = medico;
            this.medicoSeleccionado = medico;
            this.medicoForm.setValue({ nombre, hospital: hospital?._id})
          }
        })
    }
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
    .subscribe( (hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      console.log("hospitales cargadso", this.hospitales)
    })
  }

  ngOnDestroy(): void {
    
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe( medicos => {
        console.log("medicos", medicos);
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
      });
  }

  guardarMedico(){
    const { nombre } = this.medicoForm.value;
    if( this.medicoSeleccionado){
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, "success")
        });
    }else{
      this.medicoService.crearMedico( this.medicoForm.value )
        .subscribe( (resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`);
          this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id}`)
        });
    }
  }

}
