package cesar.ccr.com.service.query;

import java.util.List;

import cesar.ccr.com.entity.Itens;

public interface IItensQueryService {

	Itens findById(final long id);

	List<Itens> list();

}
