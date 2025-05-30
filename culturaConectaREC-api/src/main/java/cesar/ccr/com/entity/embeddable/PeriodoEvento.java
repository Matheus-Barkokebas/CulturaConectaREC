package cesar.ccr.com.entity.embeddable;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class PeriodoEvento {

    private LocalDate dataInicio;
    private LocalDate dataFim;

    private LocalTime horarioInicio;
    private LocalTime horarioFim;
}
