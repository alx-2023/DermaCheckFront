import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tratamiento } from '../models/Tratamiento';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class TratamientoService {
  private url = `${base_url}/tratamientos`;
  private listaCambio = new Subject<Tratamiento[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Tratamiento[]>(this.url);
  }
  insert(tratamiento: Tratamiento) {
    return this.http.post<Tratamiento>(this.url, tratamiento);
  }
  setList(listaNueva: Tratamiento[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Tratamiento>(`${this.url}/${id}`);
  }
  update(tratamiento: Tratamiento) {
    return this.http.put(this.url, tratamiento);
  }
}
