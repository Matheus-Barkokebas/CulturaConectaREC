import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITipoItensService } from './itipoItens.service';
import { SaveTipoItensDto, TipoItensDto } from './tipoItens.models';

@Injectable({
  providedIn: 'root',
})
export class TipoItensService implements ITipoItensService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: SaveTipoItensDto): Observable<SaveTipoItensDto> {
    return this.http.post<TipoItensDto>(`${this.basePath}tipoItens`, request);
  }
  update(id: number, request: TipoItensDto): Observable<TipoItensDto> {
    return this.http.put<TipoItensDto>(
      `${this.basePath}tipoItens/${id}`,
      request
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}tipoItens/${id}`);
  }
  list(): Observable<TipoItensDto[]> {
    return this.http.get<TipoItensDto[]>(`${this.basePath}tipoItens`);
  }
  findByID(id: number): Observable<TipoItensDto> {
    return this.http.get<TipoItensDto>(`${this.basePath}tipoItens/${id}`);
  }
}
