import { Observable } from 'rxjs';
import { EventoDto } from './evento.models';

export interface IEventoService {
  save(request: EventoDto): Observable<EventoDto>;

  update(id: number, request: EventoDto): Observable<EventoDto>;

  delete(id: number): Observable<void>;

  list(): Observable<EventoDto[]>;

  findByID(id: number): Observable<EventoDto>;
}
