package cesar.ccr.com.entity.embeddable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class InfoBasicas {

	@Column(name = "enome")
	private String nome;

	@Column(name = "descricao")
	private String descricao;

	@Column(name = "eve_status")
	private String status;

}
