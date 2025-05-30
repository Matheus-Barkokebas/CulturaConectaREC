package cesar.ccr.com.entity;

import cesar.ccr.com.entity.embeddable.DetalhesEvento;
import cesar.ccr.com.entity.embeddable.EnderecoEvento;
import cesar.ccr.com.entity.embeddable.InfoBasicas;
import cesar.ccr.com.entity.embeddable.LinksEvento;
import cesar.ccr.com.entity.embeddable.PeriodoEvento;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
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
    private Long id;
    
    @Embedded
    private InfoBasicas infoBasicas;

    @Embedded
    private PeriodoEvento periodo;

    @Embedded
    private EnderecoEvento endereco;

    @Embedded
    private DetalhesEvento detalhes;

    @Embedded
    private LinksEvento links;

    @ManyToOne
    @JoinColumn(name = "secretaria_responsavel")
    private Secretaria secretariaResponsavel;
}

