import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrl: './busquedas.component.css'
})
export class BusquedasComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];


  constructor( 
    private activatedRoute: ActivatedRoute,
    private busquedaService: BusquedasService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({ termino }) => {
        this.activatedRoute.params
          .subscribe( ({ termino }) => this.busquedaGlobal(termino));
      });
  }

  busquedaGlobal( termino: string ){
    this.busquedaService.busquedaGlobal(termino)
      .subscribe( (resp: any) => {
        console.log("res", resp)
        this.usuarios   = resp.usuarios || [];
        this.medicos    = resp.medicos || [];
        this.hospitales = resp.hospitales || [];
      });

  }

  abrirMedico(medico: Medico){

  }
}
