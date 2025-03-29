package cesar.ccr.com.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Secretaria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "secretaria_id")
    private Long idSecretaria;
    
    @Column(name = "secretaria_nome")
    private String nome;
    
    @Column(name = "secretaria_descricao")
    private String descricao;
    
    @OneToMany(mappedBy = "secretaria")
    private List<Usuario> usuarios;

    @OneToMany(mappedBy = "secretariaResponsavel")
    private List<Evento> eventos;
}

