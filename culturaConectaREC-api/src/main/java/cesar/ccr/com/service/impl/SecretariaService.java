package cesar.ccr.com.service.impl;

import org.springframework.stereotype.Repository;

import cesar.ccr.com.entity.Secretaria;
import cesar.ccr.com.repository.SecretariaRepository;
import cesar.ccr.com.repository.UsuarioRepository;
import cesar.ccr.com.service.ISecretariaService;
import cesar.ccr.com.service.query.ISecretariaQueryService;
import cesar.ccr.com.service.query.IUsuarioQueryService;
import lombok.AllArgsConstructor;

@Repository
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
	public Secretaria update(Secretaria entity) {
		queryService.findById(entity.getId());
		
		var stored = queryService.findById(entity.getId()); 
		stored.setNome(entity.getNome());
		
		return repository.save(stored);
	}

	@Override
	public void delete(long id) {
		queryService.findById(id);
		repository.deleteById(id);	
	}

}
