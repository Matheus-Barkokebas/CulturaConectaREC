package cesar.ccr.com.entity.mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import cesar.ccr.com.controller.dto.UsuarioDto;
import cesar.ccr.com.entity.Usuario;

@Mapper(componentModel = SPRING)
public interface IUsuarioMapper {

	IUsuarioMapper INSTANCE = Mappers.getMapper(IUsuarioMapper.class);

	@Mapping(source = "id", target = "id")
	@Mapping(source = "nome", target = "nome")
	@Mapping(source = "cpf", target = "cpf")
	@Mapping(source = "email", target = "email")
	@Mapping(source = "senha", target = "senha")
	@Mapping(source = "cargo", target = "cargo")
	@Mapping(source = "secretaria", target = "secretaria")
	@Mapping(source = "permissao", target = "permissao")
	Usuario toDto(final UsuarioDto dto);
	
	UsuarioDto toSaveResponse(final Usuario entity);

	UsuarioDto toUpdateResponse(final Usuario entity);
	
	UsuarioDto toDetailResponse(final Usuario entity);
	
	 List<Usuario> toListResponse(final List<Usuario> entities);
}
