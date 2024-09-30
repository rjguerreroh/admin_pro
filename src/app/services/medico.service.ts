import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs';
const { base_url } = environment;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private http: HttpClient
  ) { }

  get token() {
    return localStorage.getItem('token') || '';
  }

  cargarMedicos(){
    const url = `${base_url}/medicos`;
    return this.http.get<{ ok: boolean, medicos: Medico[] }>(url, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( resp => resp.medicos )
    )
  }

  obtenerMedicoPorId(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.get<{ ok: boolean, medico: Medico }>(url, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: { ok: boolean, medico: Medico }) => resp.medico)
    );
  }

  crearMedico( medico: { nombre: string, hospital: string } ) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, {
      headers: {
        'x-token': this.token
      }
    });
  }

  actualizarMedico( medico: Medico ) {
    const url = `${base_url}/medicos/${ medico._id }`;
    return this.http.put(url, medico, {
      headers: {
        'x-token': this.token
      }
    });
  }

  borrarMedico( _id: string ) {
    const url = `${base_url}/medicos/${ _id }`;
    return this.http.delete(url, {
      headers: {
        'x-token': this.token
      }
    });
  }

}
