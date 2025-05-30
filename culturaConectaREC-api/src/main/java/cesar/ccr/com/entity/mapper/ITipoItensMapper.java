package cesar.ccr.com.entity.mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import cesar.ccr.com.controller.dto.TipoItensDto;
import cesar.ccr.com.entity.TipoItens;

@Mapper(componentModel = SPRING)
public interface ITipoItensMapper {

	ITipoItensMapper INSTANCE = Mappers.getMapper(ITipoItensMapper.class);
	
    @Mapping(target = "id", ignore = true)
	@Mapping(source = "nome", target = "nome")
	TipoItens toEntity(final TipoItensDto dto);
    
    TipoItensDto toSaveResponse(final TipoItens entity);
	
	@Mapping(source = "id", target = "id")
	@Mapping(source = "nome", target = "nome")
	TipoItensDto toDto(final TipoItens entity);
	
	TipoItensDto toUpdateResponse(final TipoItens entity);
	
	TipoItensDto toDetailResponse(final TipoItens entity);
	
	List<TipoItens> toListResponse(final List<TipoItens> entities);
}
