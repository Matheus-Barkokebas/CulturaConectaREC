package cesar.ccr.com.service.impl;

import org.springframework.stereotype.Service;

import cesar.ccr.com.entity.Secretaria;
import cesar.ccr.com.repository.SecretariaRepository;
import cesar.ccr.com.service.ISecretariaService;
import cesar.ccr.com.service.query.ISecretariaQueryService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SecretariaService implements ISecretariaService{

	private SecretariaRepository repository;
	private ISecretariaQueryService queryService;
	
	@Override
	public Secretaria save(Secretaria entity) {
		queryService.verifyNome(entity.getNome());
		
		return repository.save(entity);
	}
	
	@Override
	public Secretaria update(long id, Secretaria entity) {
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
