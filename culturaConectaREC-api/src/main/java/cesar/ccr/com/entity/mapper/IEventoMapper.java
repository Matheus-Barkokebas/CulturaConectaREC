package cesar.ccr.com.entity.mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import cesar.ccr.com.controller.dto.EventoDto;
import cesar.ccr.com.entity.Evento;

@Mapper(componentModel = SPRING)
public interface IEventoMapper {
	
	ISecretariaMapper INSTANCE = Mappers.getMapper(ISecretariaMapper.class);
	
	@Mapping(target = "id", ignore = true)
	@Mapping(source = "nome", target = "nome")
	@Mapping(source = "descricao", target = "descricao")
	@Mapping(source = "dataInicio", target = "dataInicio")
	@Mapping(source = "dataFim", target = "dataFim")
	@Mapping(source = "localizacao", target = "localizacao")
	@Mapping(source = "tipo", target = "tipo")
	@Mapping(source = "status", target = "status")
	@Mapping(source = "secretariaResponsavel", target = "secretariaResponsavel")
	Evento toEntity(final EventoDto dto);
	
	EventoDto toSaveResponse(final Evento entity);
	
	@Mapping(source = "id", target = "id")
	@Mapping(source = "nome", target = "nome")
	@Mapping(source = "descricao", target = "descricao")
	@Mapping(source = "dataInicio", target = "dataInicio")
	@Mapping(source = "dataFim", target = "dataFim")
	@Mapping(source = "localizacao", target = "localizacao")
	@Mapping(source = "tipo", target = "tipo")
	@Mapping(source = "status", target = "status")
	@Mapping(source = "secretariaResponsavel", target = "secretariaResponsavel")
	EventoDto toDto(final Evento entity);
	
	EventoDto toUpdateResponse(final Evento entity);
	
	EventoDto toDetailResponse(final Evento entity);
	
	 List<Evento> toListResponse(final List<Evento> entities);

}
