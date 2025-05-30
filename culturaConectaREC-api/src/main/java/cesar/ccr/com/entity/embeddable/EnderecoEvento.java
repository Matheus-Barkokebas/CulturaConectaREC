package cesar.ccr.com.entity.embeddable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class EnderecoEvento {

    private String espacoPublico;
    private String tipoEspaco;

    private String cep;
    private String logradouro;
    private String numero;
    private String complemento;

    private String bairro;
    private String cidade;
    private String uf;

    private String pontoReferencia;

    private String linkGoogleMaps;
}
