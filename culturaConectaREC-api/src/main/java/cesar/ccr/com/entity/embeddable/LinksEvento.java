package cesar.ccr.com.entity.embeddable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class LinksEvento {

    private String linkSiteOficial;
    private String linkMapa;
}
