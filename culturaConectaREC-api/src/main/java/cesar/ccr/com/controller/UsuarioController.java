package cesar.ccr.com.controller;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import cesar.ccr.com.controller.dto.UsuarioDto;
import cesar.ccr.com.entity.Usuario;
import cesar.ccr.com.entity.mapper.IUsuarioMapper;
import cesar.ccr.com.service.impl.UsuarioService;
import cesar.ccr.com.service.query.impl.UsuarioQueryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usuarios")
@AllArgsConstructor
public class UsuarioController {

	private UsuarioService service;

	private UsuarioQueryService queryService;

	private IUsuarioMapper mapper;

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	@ResponseStatus(CREATED)
	UsuarioDto save(@RequestBody @Valid final UsuarioDto dto) {
		var entity = mapper.toEntity(dto);
		service.save(entity);
		return mapper.toSaveResponse(entity);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("{id}")
	UsuarioDto update(@PathVariable("id") final long id, @RequestBody @Valid final UsuarioDto dto) {
		var entity = mapper.toEntity(dto);
		service.update(id, entity);
		return mapper.toUpdateResponse(entity);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("{id}")
	@ResponseStatus(NO_CONTENT)
	void delete(@PathVariable("id") final long id) {
		service.delete(id);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("{id}")
	UsuarioDto findById(@PathVariable("id") final long id) {
		var entity = queryService.findById(id);
		return mapper.toDetailResponse(entity);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/cpf/{cpf}")
	UsuarioDto findByCpf(@PathVariable("cpf") final String cpf) {
		var entity = queryService.findByCpf(cpf);
		return mapper.toDetailResponse(entity);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	List<Usuario> list() {
		var entities = queryService.list();
		return mapper.toListResponse(entities);
	}

}
