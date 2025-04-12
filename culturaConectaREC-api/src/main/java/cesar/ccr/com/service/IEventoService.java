package cesar.ccr.com.service;

import cesar.ccr.com.entity.Evento;

public interface IEventoService {

	Evento save(final Evento entity);
	
	Evento update(final long id, final Evento entity);
	
	void delete(final long id);
}
