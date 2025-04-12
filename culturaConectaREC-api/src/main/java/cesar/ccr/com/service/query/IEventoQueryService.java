package cesar.ccr.com.service.query;

import java.util.List;

import cesar.ccr.com.entity.Evento;

public interface IEventoQueryService {

	Evento findById(final long id);
	
	List<Evento> list();
}
