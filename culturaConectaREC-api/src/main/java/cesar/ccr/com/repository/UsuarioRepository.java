package cesar.ccr.com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cesar.ccr.com.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	
	boolean existsByCpf(final String cpf);
	
	boolean existsByEmail(final String email);
	
	Optional<Usuario> findByCpf(final String cpf);
	
	Optional<Usuario> findByEmail(final String email);

}
