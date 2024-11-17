import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticulosDermatologicos } from '../models/ArticulosDermatologicos';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { revistasporusuarioDTO } from '../models/RevistasporUsuario';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ArticulosdermatologicosService {
  private url = `${base_url}/articulos-dermatologicos`;
  private listaCambio = new Subject<ArticulosDermatologicos[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<ArticulosDermatologicos[]>(this.url);
  }
  insert(articulosD: ArticulosDermatologicos) {
    return this.http.post<ArticulosDermatologicos>(this.url, articulosD);
  }
  setList(listaNueva: ArticulosDermatologicos[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<ArticulosDermatologicos>(`${this.url}/${id}`);
  }
  update(articulosDermatologicos: ArticulosDermatologicos) {
    return this.http.patch(this.url, articulosDermatologicos);
  }
  getQuantity(): Observable<revistasporusuarioDTO[]>{
    return this.http.get<revistasporusuarioDTO[]>(`${this.url}/RevistasPorUsuario`)
  }
}
