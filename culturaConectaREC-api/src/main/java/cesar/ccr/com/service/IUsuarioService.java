package cesar.ccr.com.service;

import cesar.ccr.com.entity.Usuario;

public interface IUsuarioService {

	Usuario save(final Usuario entity);
	
	Usuario update(final long id, final Usuario entity);
	
	void delete(final long id);
	
}
