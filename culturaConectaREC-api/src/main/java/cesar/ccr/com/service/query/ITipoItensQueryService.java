package cesar.ccr.com.service.query;

import java.util.List;

import cesar.ccr.com.entity.TipoItens;

public interface ITipoItensQueryService {

	TipoItens findById(final long id);

	List<TipoItens> list();
}
