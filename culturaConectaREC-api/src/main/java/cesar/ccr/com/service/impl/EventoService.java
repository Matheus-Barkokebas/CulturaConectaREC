package cesar.ccr.com.service.impl;

import org.springframework.stereotype.Service;

import cesar.ccr.com.entity.Evento;
import cesar.ccr.com.repository.EventoRepository;
import cesar.ccr.com.service.IEventoService;
import cesar.ccr.com.service.query.IEventoQueryService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventoService implements IEventoService {

    private EventoRepository repository;
    private IEventoQueryService queryService;

    @Override
    public Evento save(Evento entity) {
        return repository.save(entity);
    }

    @Override
    public Evento update(long id, Evento entity) {
        var stored = queryService.findById(id);

        stored.setInfoBasicas(entity.getInfoBasicas());
        stored.setPeriodo(entity.getPeriodo());
        stored.setEndereco(entity.getEndereco());
        stored.setDetalhes(entity.getDetalhes());
        stored.setLinks(entity.getLinks());

        stored.setSecretariaResponsavel(entity.getSecretariaResponsavel());

        return repository.save(stored);
    }

    @Override
    public void delete(long id) {
        queryService.findById(id);
        repository.deleteById(id);
    }
}
