package cesar.ccr.com.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;

public record TipoItensDto(
		@JsonProperty("id")
		Long id,
		@NotNull
		@JsonProperty("nome")
		String nome
		) {}
