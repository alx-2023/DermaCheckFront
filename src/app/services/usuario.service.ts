import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Observable, retry, Subject } from 'rxjs';
import { UsuarioxAnuncioCreditosDTO } from '../models/UsuarioxAnuncioCreditosDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Usuario[]>(this.url);
  }
  insert(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }
  setList(listaNueva: Usuario[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }
  update(usuario: Usuario) {
    return this.http.patch(this.url, usuario);
  }
  
  checkUsernameExists(username: string) {
    return this.http.get<boolean>(`${this.url}/exists/${username}`);
  }
  obtenerCantidad(): Observable<UsuarioxAnuncioCreditosDTO[]> {
    return this.http.get<UsuarioxAnuncioCreditosDTO[]>(`${this.url}/Usuario-Cantidad-Creditos`);
  }
  
}
