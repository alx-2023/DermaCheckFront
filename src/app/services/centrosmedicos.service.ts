import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CentrosMedicos } from '../models/CentrosMedicos';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CentrosmedicosService {
  private url = `${base_url}/centros-medicos`;
  private listaCambio = new Subject<CentrosMedicos[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<CentrosMedicos[]>(this.url);
  }
  insert(centroMedico: CentrosMedicos) {
    return this.http.post<CentrosMedicos>(this.url, centroMedico);
  }
  setList(listaNueva: CentrosMedicos[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<CentrosMedicos>(`${this.url}/${id}`);
  }
  update(centroMedico: CentrosMedicos) {
    return this.http.put(this.url, centroMedico);
  }
}
