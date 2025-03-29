package cesar.ccr.com.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Evento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "evento_id")
    private Long idEvento;
    
    @Column(name = "evento_nome")
    private String nome;
    
    @Column(name = "evento_descricao")
    private String descricao;
    
    @Column(name = "evento_data_inicio")
    private LocalDate dataInicio;
    
    @Column(name = "evento_data_final")
    private LocalDate dataFim;
    
    @Column(name = "evento_localizacao")
    private String localizacao;
    
    @Column(name = "evento_tipo")
    private String tipo;
    
    @Column(name = "evento_status")
    private String status;
    
    @ManyToOne
    @JoinColumn(name = "secretaria_responsavel_id")
    private Secretaria secretariaResponsavel;
}

