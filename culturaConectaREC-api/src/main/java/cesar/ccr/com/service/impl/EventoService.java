package cesar.ccr.com.service.impl;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import cesar.ccr.com.entity.Evento;
import cesar.ccr.com.repository.EventoRepository;
import cesar.ccr.com.repository.SecretariaRepository;
import cesar.ccr.com.service.IEventoService;
import cesar.ccr.com.service.query.IEventoQueryService;
import cesar.ccr.com.service.query.ISecretariaQueryService;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class EventoService implements IEventoService{

	private EventoRepository repository;
	private IEventoQueryService queryService;
	
	@Override
	public Evento save(Evento entity) {
		return repository.save(entity);
	}

	@Override
	public Evento update(long id, Evento entity) {
		
		var stored = queryService.findById(id);
		stored.setNome(entity.getNome());
		stored.setDescricao(entity.getDescricao());
		stored.setDataInicio(entity.getDataInicio());
		stored.setDataFim(entity.getDataFim());
		stored.setLocalizacao(entity.getLocalizacao());
		stored.setTipo(entity.getTipo());
		stored.setStatus(entity.getStatus());
		
		return repository.save(stored);
	}

	@Override
	public void delete(long id) {
		queryService.findById(id);
		repository.deleteById(id);
		
	}

}
