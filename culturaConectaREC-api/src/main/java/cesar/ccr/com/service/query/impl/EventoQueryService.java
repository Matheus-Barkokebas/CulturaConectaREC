package cesar.ccr.com.service.query.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import cesar.ccr.com.entity.Evento;
import cesar.ccr.com.repository.EventoRepository;
import cesar.ccr.com.service.query.IEventoQueryService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventoQueryService implements IEventoQueryService{

	private EventoRepository repository;
	
	@Override
	public Evento findById(long id) {
		return repository.findById(id).orElseThrow();
	}

	@Override
	public List<Evento> list() {
		return repository.findAll();
	}

}
