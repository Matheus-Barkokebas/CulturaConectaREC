import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { IItensService } from './iitens.service';
import { ItensDto } from './itens.models';

@Injectable({
  providedIn: 'root',
})
export class ItensService implements IItensService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: ItensDto): Observable<ItensDto> {
    return this.http.post<ItensDto>(`${this.basePath}itens`, request);
  }
  update(id: number, request: ItensDto): Observable<ItensDto> {
    return this.http.put<ItensDto>(`${this.basePath}itens/${id}`, request);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}itens/${id}`);
  }
  list(): Observable<ItensDto[]> {
    return this.http.get<ItensDto[]>(`${this.basePath}itens`);
  }
  findByID(id: number): Observable<ItensDto> {
    return this.http.get<ItensDto>(`${this.basePath}itens/${id}`);
  }
}
