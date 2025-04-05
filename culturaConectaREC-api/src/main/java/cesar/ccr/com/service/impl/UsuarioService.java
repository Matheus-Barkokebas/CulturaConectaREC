package cesar.ccr.com.service.impl;

import org.springframework.stereotype.Repository;

import cesar.ccr.com.entity.Usuario;
import cesar.ccr.com.repository.UsuarioRepository;
import cesar.ccr.com.service.IUsuarioService;
import cesar.ccr.com.service.query.IUsuarioQueryService;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class UsuarioService implements IUsuarioService {

	private final UsuarioRepository repository;
	private final IUsuarioQueryService queryService;

	@Override
	public Usuario save(final Usuario entity) {
		queryService.verifyCpf(entity.getCpf());
		queryService.verifyEmail(entity.getEmail());
		
		return repository.save(entity);
	}

	@Override
	public Usuario update(final Usuario entity) {
		queryService.verifyCpf(entity.getId(), entity.getCpf());
		queryService.verifyEmail(entity.getId(), entity.getEmail());
		
		var stored = queryService.findById(entity.getId());
		stored.setNome(entity.getNome());
		stored.setEmail(entity.getEmail());
		stored.setSenha(entity.getSenha());
		stored.setCargo(entity.getCargo());
		stored.setPermissao(entity.getPermissao());
		
		return repository.save(stored);
	}

	@Override
	public void delete(final long id) {
		queryService.findById(id);
		repository.deleteById(id);

	}

}
