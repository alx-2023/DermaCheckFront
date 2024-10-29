import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Enfermedad } from '../models/Enfermedad';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class EnfermedadService {
  private url = `${base_url}/enfermedades`;
  private listaCambio = new Subject<Enfermedad[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Enfermedad[]>(this.url);
  }
  insert(enfermedad: Enfermedad) {
    return this.http.post<Enfermedad>(
      this.url,
      enfermedad
    );
  }
  setList(listaNueva: Enfermedad[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Enfermedad>(`${this.url}/${id}`);
  }
  update(enfermedad: Enfermedad) {
    return this.http.put(this.url, enfermedad);
  }
}
