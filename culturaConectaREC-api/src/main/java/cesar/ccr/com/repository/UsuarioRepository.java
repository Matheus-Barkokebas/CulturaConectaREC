package cesar.ccr.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cesar.ccr.com.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

}
