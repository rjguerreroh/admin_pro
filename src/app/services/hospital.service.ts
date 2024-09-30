import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';
const { base_url } = environment;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient
  ) { }

  get token() {
    return localStorage.getItem('token') || '';
  }

  cargarHospitales() {
    const url = `${base_url}/hospitales`;
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( resp => resp.hospitales )
    );
  }

  crearHospital( nombre: string ) {
    const url = `${base_url}/hospitales`;
    return this.http.post(url, { nombre }, {
      headers: {
        'x-token': this.token
      }
    });
  }

  actualizarHospital( _id: string, nombre: string) {
    const url = `${base_url}/hospitales/${ _id }`;
    return this.http.put(url, { nombre }, {
      headers: {
        'x-token': this.token
      }
    });
  }

  borrarHospital( _id: string ) {
    const url = `${base_url}/hospitales/${ _id }`;
    return this.http.delete(url, {
      headers: {
        'x-token': this.token
      }
    });
  }
}
