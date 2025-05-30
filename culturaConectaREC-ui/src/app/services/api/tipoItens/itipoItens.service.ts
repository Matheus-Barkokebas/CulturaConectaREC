import { Observable } from 'rxjs';
import { SaveTipoItensDto, TipoItensDto } from './tipoItens.models';

export interface ITipoItensService {
  save(request: SaveTipoItensDto): Observable<SaveTipoItensDto>;

  update(id: number, request: TipoItensDto): Observable<TipoItensDto>;

  delete(id: number): Observable<void>;

  list(): Observable<TipoItensDto[]>;

  findByID(id: number): Observable<TipoItensDto>;
}
