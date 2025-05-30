package cesar.ccr.com.service.impl;

import org.springframework.stereotype.Service;

import cesar.ccr.com.entity.Itens;
import cesar.ccr.com.repository.ItensRepository;
import cesar.ccr.com.service.IItensService;
import cesar.ccr.com.service.query.IItensQueryService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ItensService implements IItensService {

	private ItensRepository repository;
	private IItensQueryService queryService;

	@Override
	public Itens save(Itens entity) {
		return repository.save(entity);
	}

	@Override
	public Itens update(long id, Itens entity) {
		var stored = queryService.findById(id);
		stored.setNome(entity.getNome());

		return repository.save(stored);
	}

	@Override
	public void delete(long id) {
		queryService.findById(id);
		repository.deleteById(id);
	}

}
