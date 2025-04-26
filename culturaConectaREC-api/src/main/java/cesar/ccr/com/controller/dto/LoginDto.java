package cesar.ccr.com.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record LoginDto(
		@NotNull
		@Email
		@JsonProperty("email")
		String email,
		
		@NotNull
		@JsonProperty("senha")
		String senha
		){}
