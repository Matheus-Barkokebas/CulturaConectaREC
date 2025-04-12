import { Injectable } from '@angular/core';
import { ISecretariaService } from './isecretaria.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SaveSecretariaDto, SecretariaDto } from './secretaria.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecretariaService implements ISecretariaService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: SaveSecretariaDto): Observable<SaveSecretariaDto> {
    return this.http.post<SecretariaDto>(`${this.basePath}secretaria`, request);
  }
  update(id: number, request: SecretariaDto): Observable<SecretariaDto> {
    return this.http.put<SecretariaDto>(
      `${this.basePath}secretaria/${id}`,
      request
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}secretaria/${id}`);
  }
  list(): Observable<SecretariaDto[]> {
    return this.http.get<SecretariaDto[]>(`${this.basePath}secretaria`);
  }
  findByID(id: number): Observable<SecretariaDto> {
    return this.http.get<SecretariaDto>(`${this.basePath}secretaria/${id}`);
  }
}
