package cesar.ccr.com.service.query.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import cesar.ccr.com.entity.Secretaria;
import cesar.ccr.com.repository.SecretariaRepository;
import cesar.ccr.com.service.query.ISecretariaQueryService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SecretariaQueryService implements ISecretariaQueryService{

	private SecretariaRepository repository;
	
	@Override
	public Secretaria findById(long id) {
		return repository.findById(id).orElseThrow();
	}

	@Override
	public List<Secretaria> list() {
		return repository.findAll();
	}

	@Override
	public void verifyNome(String nome) {
		if (repository.existsByNome(nome)) {
			var message = "O CPF " + nome + " já está em uso";
		}	
	}

}
