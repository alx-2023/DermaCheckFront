import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Diagnostico } from '../models/Diagnostico';
import { Observable, Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class DiagnosticoService {
  private url = `${base_url}/diagnosticos`;
  private listaCambio = new Subject<Diagnostico[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Diagnostico[]>(this.url);
  }
  insert(diagnostico: Diagnostico) {
    return this.http.post<Diagnostico>(this.url, diagnostico);
  }
  setList(listaNueva: Diagnostico[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Diagnostico>(`${this.url}/${id}`);
  }
  update(diagnostico: Diagnostico) {
    return this.http.patch(this.url, diagnostico);
  }
  diagnosticoMaxPunt():Observable<Diagnostico[]>{
    return this.http.get<Diagnostico[]>(`${this.url}/maxima-puntuacion`);
  }

}
