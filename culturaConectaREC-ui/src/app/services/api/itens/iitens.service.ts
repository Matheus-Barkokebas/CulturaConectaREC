import { Observable } from 'rxjs';
import { ItensDto } from './itens.models';

export interface IItensService {
  save(request: ItensDto): Observable<ItensDto>;

  update(id: number, request: ItensDto): Observable<ItensDto>;

  delete(id: number): Observable<void>;

  list(): Observable<ItensDto[]>;

  findByID(id: number): Observable<ItensDto>;
}
