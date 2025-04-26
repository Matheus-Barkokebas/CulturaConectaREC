package cesar.ccr.com.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import cesar.ccr.com.entity.Secretaria;
import cesar.ccr.com.entity.enums.Permissoes;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UsuarioDto(
		@JsonProperty("id")
		Long id,
		@NotNull
		@JsonProperty("nome")
		String nome,
		@NotNull
		@JsonProperty("cpf")
		String cpf,
		@NotNull
		@Email
		@JsonProperty("email")
		String email,
		@NotNull
		@JsonProperty("senha")
		String senha,
		@NotNull
		@JsonProperty("cargo")
		String cargo,
		@JsonProperty("secretaria")
		@JsonIgnore
		Secretaria secretaria,
		@NotNull
		@JsonProperty("permissao")
		Permissoes permissao
		){}
