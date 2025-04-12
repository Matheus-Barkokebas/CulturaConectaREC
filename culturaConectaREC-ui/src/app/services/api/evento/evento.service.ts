import { Observable } from 'rxjs';
import { EventoDto } from './evento.models';
import { IEventoService } from './ievento.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventoService implements IEventoService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: EventoDto): Observable<EventoDto> {
    return this.http.post<EventoDto>(`${this.basePath}eventos`, request);
  }
  update(id: number, request: EventoDto): Observable<EventoDto> {
    return this.http.put<EventoDto>(`${this.basePath}eventos/${id}`, request);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}eventos/${id}`);
  }
  list(): Observable<EventoDto[]> {
    return this.http.get<EventoDto[]>(`${this.basePath}eventos`);
  }
  findByID(id: number): Observable<EventoDto> {
    return this.http.get<EventoDto>(`${this.basePath}eventos/${id}`);
  }
  findByCPF(cpf: number): Observable<EventoDto> {
    return this.http.get<EventoDto>(`${this.basePath}eventos/${cpf}`);
  }
}
