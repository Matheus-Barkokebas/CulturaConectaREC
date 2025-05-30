package cesar.ccr.com.service;

import cesar.ccr.com.entity.Itens;

public interface IItensService {

	Itens save(final Itens entity);

	Itens update(final long id, final Itens entity);

	void delete(final long id);

}
