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

import cesar.ccr.com.controller.dto.ItensDto;
import cesar.ccr.com.entity.Itens;
import cesar.ccr.com.entity.mapper.IItensMapper;
import cesar.ccr.com.service.impl.ItensService;
import cesar.ccr.com.service.query.impl.ItensQueryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/itens")
@AllArgsConstructor
public class ItensController {

	private ItensService service;
	
	private ItensQueryService queryService;
	
	private IItensMapper mapper;
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	@ResponseStatus(CREATED)
	ItensDto save(@RequestBody @Valid final ItensDto dto) {
		var entity = mapper.toEntity(dto);
		service.save(entity);
		return mapper.toSaveResponse(entity);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("{id}")
	ItensDto update (@PathVariable("id") final long id, @RequestBody @Valid final ItensDto dto) {
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
	ItensDto findById(@PathVariable("id") final long id) {
		var entity = queryService.findById(id);
		return mapper.toDetailResponse(entity);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	List<Itens> list(){
		var entities = queryService.list();
		return mapper.toListResponse(entities);
	}
}
