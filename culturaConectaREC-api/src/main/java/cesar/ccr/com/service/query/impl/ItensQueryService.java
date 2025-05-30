package cesar.ccr.com.service.query.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import cesar.ccr.com.entity.Itens;
import cesar.ccr.com.repository.ItensRepository;
import cesar.ccr.com.service.query.IItensQueryService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ItensQueryService implements IItensQueryService{

	private ItensRepository repository;
	
	@Override
	public Itens findById(long id) {
		return repository.findById(id).orElseThrow();
	}

	@Override
	public List<Itens> list() {
		return repository.findAll();
	}
}