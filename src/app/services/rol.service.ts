import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/Rol';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Rol[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Rol[]>(this.url);
  }
  insert(rol: Rol) {
    return this.http.post<Rol>(this.url, rol);
  }
  setId(listaNueva: Rol[]) {
    return this.listaCambio.next(listaNueva);
  }
  getId() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    this.http.get<Rol>(`${this.url}/${id}`);
  }
  update(rol: Rol) {
    this.http.put(this.url, rol);
  }
}
