import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Anuncio } from '../models/Anuncio';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AnuncioService {
  private url = `${base_url}/anuncio`;
  private listaCambio = new Subject<Anuncio[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Anuncio[]>(this.url);
  }
  insert(anuncio: Anuncio) {
    return this.http.post<Anuncio>(this.url, anuncio);
  }
  setList(listaNueva: Anuncio[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Anuncio>(`${this.url}/${id}`);
  }
  update(anuncio: Anuncio) {
    return this.http.patch(this.url, anuncio);
  }
}
