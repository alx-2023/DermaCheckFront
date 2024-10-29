import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Recuperacion } from '../models/Recuperacion';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RecuperacionService {
  private url = `${base_url}/recuperaciones`;
  private listaCambio = new Subject<Recuperacion[]>();
  constructor(private http:HttpClient) { }
  list () {
    return this.http.get<Recuperacion[]>(this.url);
  }
  insert(recuperacion: Recuperacion) {
    return this.http.post<Recuperacion>(
      this.url,
      recuperacion
    );
  }
  setList(listaNueva: Recuperacion[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Recuperacion>(`${this.url}/${id}`);
  }
  update(recuperacion: Recuperacion) {
    return this.http.put(this.url, recuperacion);
  }
}
