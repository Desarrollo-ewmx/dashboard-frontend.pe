<template>
	<CSidebarNav>
		<CSidebarNavDropdown name="Configuración" to="/configuracion" icon="cilSettings" v-if="permisos([])">
			<CSidebarNavItem :name="sistema.emp_abrev" to="/sistema" icon="cilGlobeAlt" v-if="permisos(['sistema.edit','sistema.show'])"></CSidebarNavItem>
			
			<CSidebarNavDropdown name="Tutoriales" to="/tutoriales" icon="cibYoutube" v-if="permisos(['tutotial.create','tutotial.show','tutotial.edit','tutotial.destroy'])">
				<CSidebarNavItem name="Lista de tutoriales" to="/tutoriales" icon="cilList" v-if="permisos(['tutotial.create','tutotial.show','tutotial.edit','tutotial.destroy'])"></CSidebarNavItem>
				<CSidebarNavItem name="Registrar tutorial" to="/tutoriales/registrar" icon="cilPlus" v-if="permisos(['tutotial.create'])"></CSidebarNavItem>
			</CSidebarNavDropdown>


			<CSidebarNavDropdown name="Catálogos" to="/catalogos" icon="cilBook" v-if="permisos(['catalogo.create','catalogo.show','catalogo.edit','catalogo.destroy'])">
				<CSidebarNavItem name="Lista de catálogos" to="/catalogos" icon="cilList" v-if="permisos(['catalogo.create','catalogo.show','catalogo.edit','catalogo.destroy'])"></CSidebarNavItem>
				<CSidebarNavItem name="Registrar catálogo" to="/catalogos/registrar" icon="cilPlus" v-if="permisos(['catalogo.create'])"></CSidebarNavItem>
			</CSidebarNavDropdown>


		</CSidebarNavDropdown>
		<CSidebarNavDropdown name="Sucursales" to="/sucursales" icon="cilBuilding" v-if="permisos(['sucursal.create','sucursal.show','sucursal.edit','sucursal.destroy'])">
			<CSidebarNavItem name="Lista de sucursales" to="/sucursales" icon="cilList" v-if="permisos(['sucursal.create','sucursal.show','sucursal.edit','sucursal.destroy'])"></CSidebarNavItem>
			<CSidebarNavItem name="Registrar sucursal" to="/sucursales/registrar" icon="cilPlus" v-if="permisos(['sucursal.create'])"></CSidebarNavItem>
		</CSidebarNavDropdown>
		<CSidebarNavDropdown name="Usuarios" to="/usuarios" icon="cilUser" v-if="permisos(['usuario.create','usuario.show','usuario.edit', 'usuario.destroy'])">
			<CSidebarNavItem name="Lista de usuarios" to="/usuarios" icon="cilList" v-if="permisos(['usuario.create','usuario.show','usuario.edit', 'usuario.destroy'])"></CSidebarNavItem>
			<CSidebarNavItem name="Registrar usuario" to="/usuarios/registrar" icon="cilPlus" v-if="permisos(['usuario.create'])"></CSidebarNavItem>
		</CSidebarNavDropdown>


		<CSidebarNavDropdown name="Roles" to="/roles" icon="cilLockLocked" v-if="permisos(['rol.create','rol.show','rol.edit', 'rol.destroy'])">
			<CSidebarNavItem name="Lista de roles" to="/roles" icon="cilList" v-if="permisos(['rol.create','rol.show','rol.edit', 'rol.destroy'])"></CSidebarNavItem>
			<CSidebarNavItem name="Registrar rol" to="/roles/registrar" icon="cilPlus" v-if="permisos(['rol.create'])"></CSidebarNavItem>
		</CSidebarNavDropdown>


	</CSidebarNav>
</template>

<script>
import check from '@/repositories/global/check'

export default {
	name: 'Menu',
	data() {
		return {
      sistema: JSON.parse(localStorage.getItem("sistema")),
    }
	},
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }
  },
}
</script>
