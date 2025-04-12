package cesar.ccr.com.entity.mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import cesar.ccr.com.controller.dto.SecretariaDto;
import cesar.ccr.com.entity.Secretaria;

@Mapper(componentModel = SPRING)
public interface ISecretariaMapper {

	ISecretariaMapper INSTANCE = Mappers.getMapper(ISecretariaMapper.class);
	
    @Mapping(target = "id", ignore = true)
	@Mapping(source = "nome", target = "nome")
	Secretaria toEntity(final SecretariaDto dto);
    
    SecretariaDto toSaveResponse(final Secretaria entity);
	
	@Mapping(source = "id", target = "id")
	@Mapping(source = "nome", target = "nome")
	SecretariaDto toDto(final Secretaria entity);
	
	SecretariaDto toUpdateResponse(final Secretaria entity);
	
	SecretariaDto toDetailResponse(final Secretaria entity);
	
	List<Secretaria> toListResponse(final List<Secretaria> entities);
}
