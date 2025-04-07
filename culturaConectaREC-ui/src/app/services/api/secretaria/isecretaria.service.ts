import { Observable } from "rxjs";
import { SaveSecretariaDto, SecretariaDto } from "./secretaria.models";

export interface ISecretariaService{

    save(request: SaveSecretariaDto): Observable<SaveSecretariaDto>

    update(id: number, request: SecretariaDto): Observable<SecretariaDto>

    delete(id: number): Observable<void>

    list(): Observable<SecretariaDto[]>

    findByID(id: number): Observable<SecretariaDto>
}
