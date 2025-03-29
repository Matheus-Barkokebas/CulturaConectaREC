package cesar.ccr.com.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Agenda {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agenda_id")
    private Long idAgenda;
    
    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Evento evento;
    
    @ManyToOne
    @JoinColumn(name = "secretaria_id")
    private Secretaria secretaria;
}
