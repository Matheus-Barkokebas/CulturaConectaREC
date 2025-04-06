package cesar.ccr.com.service.query;

import java.util.List;

import cesar.ccr.com.entity.Secretaria;

public interface ISecretariaQueryService {

	Secretaria findById(final long id);
	
	List<Secretaria> list();
	
	void verifyNome(final String nome);
}
