package cesar.ccr.com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuario_id")
    private Long idUsuario;
    
    @Column(name = "usuario_nome")
    private String nome;
    
    @Column(name = "usuario_email")
    private String email;
    
    @Column(name = "usuario_senha")
    private String senha;
    
    @Column(name = "usuario_cargo")
    private String cargo;
    
    @ManyToOne
    @JoinColumn(name = "secretaria_id")
    private Secretaria secretaria;
    
    @Column(name = "usuario_permissao")
    private String permissao;
}

