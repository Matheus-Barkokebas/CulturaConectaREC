package cesar.ccr.com.service;

import cesar.ccr.com.entity.Secretaria;

public interface ISecretariaService{

	Secretaria save(final Secretaria entity);
	
	Secretaria update(final long id, final Secretaria entity);
	
	void delete(final long id);
}
