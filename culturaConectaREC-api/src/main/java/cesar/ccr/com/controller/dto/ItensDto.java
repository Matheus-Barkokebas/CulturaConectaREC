package cesar.ccr.com.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import cesar.ccr.com.entity.TipoItens;
import jakarta.validation.constraints.NotNull;

public record ItensDto(
		@JsonProperty("id")
		Long id,
		@NotNull
		@JsonProperty("nome")
		String nome,
		@NotNull
		@JsonProperty("tipoItens")
		TipoItens tipoItens
		) {}
