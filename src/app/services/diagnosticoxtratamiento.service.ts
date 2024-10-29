import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiagnosticoxTratamiento } from '../models/DiagnosticoxTratamiento';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class DiagnosticoxtratamientoService {
  private url = `${base_url}/diagnosticos-tratamientos`;
  private listaCambio = new Subject<DiagnosticoxTratamiento[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<DiagnosticoxTratamiento[]>(this.url);
  }
  insert(diagnosticoxTratamiento: DiagnosticoxTratamiento) {
    return this.http.post<DiagnosticoxTratamiento>(
      this.url,
      diagnosticoxTratamiento
    );
  }
  setList(listaNueva: DiagnosticoxTratamiento[]) {
    return this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<DiagnosticoxTratamiento>(`${this.url}/${id}`);
  }
  update(diagnosticoxTratamiento: DiagnosticoxTratamiento) {
    return this.http.put(this.url, diagnosticoxTratamiento);
  }
}
