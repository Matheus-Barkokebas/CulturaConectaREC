package cesar.ccr.com.service.impl;

import org.springframework.stereotype.Service;

import cesar.ccr.com.entity.TipoItens;
import cesar.ccr.com.repository.TipoItemRepositrory;
import cesar.ccr.com.service.ITiposItensService;
import cesar.ccr.com.service.query.ITipoItensQueryService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TipoItensService implements ITiposItensService{
	
	private TipoItemRepositrory repository;
    private ITipoItensQueryService queryService;

    @Override
    public TipoItens save(TipoItens entity) {
        return repository.save(entity);
    }

    @Override
    public TipoItens update(long id, TipoItens entity) {
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
