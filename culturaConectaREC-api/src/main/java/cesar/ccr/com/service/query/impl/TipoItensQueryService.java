package cesar.ccr.com.service.query.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import cesar.ccr.com.entity.TipoItens;
import cesar.ccr.com.repository.TipoItemRepositrory;
import cesar.ccr.com.service.query.ITipoItensQueryService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TipoItensQueryService implements ITipoItensQueryService{

	private TipoItemRepositrory repository;
	
	@Override
	public TipoItens findById(long id) {
		return repository.findById(id).orElseThrow();
	}

	@Override
	public List<TipoItens> list() {
		return repository.findAll();
	}
}
