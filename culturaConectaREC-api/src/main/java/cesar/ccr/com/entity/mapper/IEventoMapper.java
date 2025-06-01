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
    @Mapping(source = "infoBasicas", target = "infoBasicas")
    @Mapping(source = "periodo", target = "periodo")
    @Mapping(source = "endereco", target = "endereco")
    @Mapping(source = "detalhes", target = "detalhes")
    @Mapping(source = "links", target = "links")
    @Mapping(source = "contatosEvento", target = "contatosEvento")
    @Mapping(source = "secretariaResponsavel", target = "secretariaResponsavel")
	Evento toEntity(final EventoDto dto);
	
	EventoDto toSaveResponse(final Evento entity);
	
	@Mapping(target = "id", ignore = true)
    @Mapping(source = "infoBasicas", target = "infoBasicas")
    @Mapping(source = "periodo", target = "periodo")
    @Mapping(source = "endereco", target = "endereco")
    @Mapping(source = "detalhes", target = "detalhes")
    @Mapping(source = "links", target = "links")
	@Mapping(source = "contatosEvento", target = "contatosEvento")
    @Mapping(source = "secretariaResponsavel", target = "secretariaResponsavel")
	EventoDto toDto(final Evento entity);
	
	EventoDto toUpdateResponse(final Evento entity);
	
	EventoDto toDetailResponse(final Evento entity);
	
	 List<Evento> toListResponse(final List<Evento> entities);

}
