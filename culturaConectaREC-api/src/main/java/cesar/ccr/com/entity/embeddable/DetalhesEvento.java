package cesar.ccr.com.entity.embeddable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class DetalhesEvento {

    private String periodicidade;
    private String categoria;
    private int capacidade;
    
    private boolean espacoCoberto;
    private boolean acessivel;
    private boolean estacionamento;
    private boolean possuiBanheiros;
    private boolean wifiDisponivel;
    
    private String equipamentosFornecidos;
}
