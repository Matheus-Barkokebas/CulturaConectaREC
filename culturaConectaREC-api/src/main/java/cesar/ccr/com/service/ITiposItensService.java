package cesar.ccr.com.service;

import cesar.ccr.com.entity.TipoItens;

public interface ITiposItensService {

	TipoItens save(final TipoItens entity);

	TipoItens update(final long id, final TipoItens entity);

	void delete(final long id);

}
