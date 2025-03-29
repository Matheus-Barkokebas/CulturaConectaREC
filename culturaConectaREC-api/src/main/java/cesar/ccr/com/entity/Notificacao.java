package cesar.ccr.com.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Notificacao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notificacao_id")
    private Long idNotificacao;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    
    @Column(name = "notificacao_msg")
    private String mensagem;
    
    @Column(name = "notificacao_data_envio")
    private LocalDateTime dataEnvio;
    
    @Column(name = "notificacao_status")
    private String status;
}