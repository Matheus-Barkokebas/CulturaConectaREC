package cesar.ccr.com.controller;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

import java.util.List;

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

import cesar.ccr.com.controller.dto.SecretariaDto;
import cesar.ccr.com.entity.Secretaria;
import cesar.ccr.com.entity.mapper.ISecretariaMapper;
import cesar.ccr.com.service.impl.SecretariaService;
import cesar.ccr.com.service.query.impl.SecretariaQueryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/secretaria")
@AllArgsConstructor
public class SecretariaController {

	private SecretariaService service;
	
	private SecretariaQueryService queryService;
	
	private ISecretariaMapper mapper;
	
	@PostMapping
	@ResponseStatus(CREATED)
	SecretariaDto save(@RequestBody @Valid final SecretariaDto dto) {
		var entity = mapper.toEntity(dto);
		service.save(entity);
		return mapper.toSaveResponse(entity);
	}
	
	@PutMapping("{id}")
	SecretariaDto update (@PathVariable("id") final long id, @RequestBody @Valid final SecretariaDto dto) {
		var entity = mapper.toEntity(dto);
		service.update(id, entity);
		return mapper.toUpdateResponse(entity);
	}
	
	@DeleteMapping("{id}")
	@ResponseStatus(NO_CONTENT)
	void delete(@PathVariable("id") final long id) {
	    service.delete(id);
	}
	
	@GetMapping("{id}")
	SecretariaDto findById(@PathVariable("id") final long id) {
		var entity = queryService.findById(id);
		return mapper.toDetailResponse(entity);
	}
	
	@GetMapping
	List<Secretaria> list(){
		var entities = queryService.list();
		return mapper.toListResponse(entities);
	}
}
