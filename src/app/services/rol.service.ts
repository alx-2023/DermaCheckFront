import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/Rol';
import { Observable, Subject } from 'rxjs';
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
  setList(listaNueva: Rol[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number): Observable <void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  listId(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  update(rol: Rol) {
    return this.http.patch<Rol>(this.url, rol);
  }
}
