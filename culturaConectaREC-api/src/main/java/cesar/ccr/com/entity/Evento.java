package cesar.ccr.com.entity;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "tb_evento")
public class Evento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "enome")
    private String nome;
    
    @Column(name = "descricao")
    private String descricao;
    
    @Column(name = "data_inicio")
    private OffsetDateTime dataInicio;
    
    @Column(name = "data_final")	
    private OffsetDateTime dataFim;
    
    @Column(name = "localizacao")
    private String localizacao;
    
    @Column(name = "tipo")
    private String tipo;
    
    @Column(name = "eve_status")
    private String status;
    
    @ManyToOne
    @JoinColumn(name = "secretaria_responsavel")
    private Secretaria secretariaResponsavel;
}

