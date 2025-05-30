package cesar.ccr.com.entity.mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import cesar.ccr.com.controller.dto.ItensDto;
import cesar.ccr.com.entity.Itens;

@Mapper(componentModel = SPRING)
public interface IItensMapper {

	IItensMapper INSTANCE = Mappers.getMapper(IItensMapper.class);
	
    @Mapping(target = "id", ignore = true)
	@Mapping(source = "nome", target = "nome")
    @Mapping(source = "tipoItens", target = "tipoItens")
	Itens toEntity(final ItensDto dto);
    
    ItensDto toSaveResponse(final Itens entity);
	
	@Mapping(source = "id", target = "id")
	@Mapping(source = "nome", target = "nome")
    @Mapping(source = "tipoItens", target = "tipoItens")
	ItensDto toDto(final Itens entity);
	
	ItensDto toUpdateResponse(final Itens entity);
	
	ItensDto toDetailResponse(final Itens entity);
	
	List<Itens> toListResponse(final List<Itens> entities);
}
