package cesar.ccr.com.controller.dto;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import cesar.ccr.com.entity.Secretaria;
import jakarta.validation.constraints.NotNull;

public record EventoDto (
		@JsonProperty("id")
		Long id,
		@JsonProperty("nome")
		@NotNull
		String nome,
		@JsonProperty("descricao")
		@NotNull
		String descricao,
		@JsonProperty("dataInicio")
		@NotNull
		OffsetDateTime dataInicio,
		@JsonProperty("dataFim")
		@NotNull
		OffsetDateTime dataFim,
		@JsonProperty("localizacao")
		@NotNull
		String localizacao,
		@JsonProperty("tipo")
		@NotNull
		String tipo,
		@JsonProperty("status")
		@NotNull
		String status,
		@JsonProperty("secretariaResponsavel")
		Secretaria secretariaResponsavel
		) {}
