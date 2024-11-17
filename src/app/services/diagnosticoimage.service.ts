import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DiagnosticoImage } from '../models/DiagnosticoImage';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class DiagnosticoimageService {
  private url = `${base_url}/diagnosticoimagen`;
  private newChange = new Subject<DiagnosticoImage[]>();
  private sortList(list: DiagnosticoImage[]): DiagnosticoImage[] {
    return list.sort((a, b) => a.idImage - b.idImage);
  }

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient
      .get<DiagnosticoImage[]>(this.url)
      .pipe(tap((data) => this.setList(data)));
  }

  insert(product: DiagnosticoImage) {
    return this.httpClient.post(this.url, product);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  listImageByProductId(idDiag: number) {
    return this.httpClient.get<DiagnosticoImage[]>(
      `${this.url}/images/${idDiag}`
    );
  }
  listId(id: number) {
    return this.httpClient.get<DiagnosticoImage>(`${this.url}/${id}`);
  }
  update(diagnostico: DiagnosticoImage) {
    return this.httpClient.patch(`${this.url}`, diagnostico);
  }
  setList(newList: DiagnosticoImage[]) {
    this.newChange.next(this.sortList(newList));
  }
  getList() {
    return this.newChange.asObservable();
  }
}
