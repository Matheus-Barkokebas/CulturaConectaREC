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
public class Parceria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parceria_id")
    private Long idParceria;
    
    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Evento evento;
    
    @Column(name = "parceria_nome")
    private String nomeParceiro;
    
    @Column(name = "parceria_tipo")
    private String tipo;
}
