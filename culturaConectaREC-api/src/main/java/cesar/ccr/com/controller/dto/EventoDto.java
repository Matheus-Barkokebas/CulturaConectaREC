package cesar.ccr.com.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import cesar.ccr.com.entity.Secretaria;
import cesar.ccr.com.entity.embeddable.ContatosEvento;
import cesar.ccr.com.entity.embeddable.DetalhesEvento;
import cesar.ccr.com.entity.embeddable.EnderecoEvento;
import cesar.ccr.com.entity.embeddable.InfoBasicas;
import cesar.ccr.com.entity.embeddable.LinksEvento;
import cesar.ccr.com.entity.embeddable.PeriodoEvento;
import jakarta.validation.constraints.NotNull;

public record EventoDto(

        @JsonProperty("id")
        Long id,

        @JsonProperty("infoBasicas")
        @NotNull
        InfoBasicas infoBasicas,

        @JsonProperty("periodo")
        @NotNull
        PeriodoEvento periodo,

        @JsonProperty("endereco")
        @NotNull
        EnderecoEvento endereco,

        @JsonProperty("detalhes")
        @NotNull
        DetalhesEvento detalhes,

        @JsonProperty("links")
        LinksEvento links,
        
        @JsonProperty("contatosEvento")
        ContatosEvento contatosEvento,

        @JsonProperty("secretariaResponsavel")
        Secretaria secretariaResponsavel

) {}
