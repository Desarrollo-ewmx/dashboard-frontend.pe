<template>
<CSidebarNavDropdown name="Catálogos" to="/catalogos" icon="cilBook" v-if="permisos(['catalogo.create','catalogo.show','catalogo.edit','catalogo.destroy'])">
	<CSidebarNavItem name="Lista de catálogos" to="/catalogos" icon="cilList" v-if="permisos(['catalogo.create','catalogo.show','catalogo.edit','catalogo.destroy'])"></CSidebarNavItem>
	<CSidebarNavItem name="Registrar catálogo" to="/catalogos/registrar" icon="cilPlus" v-if="permisos(['catalogo.create'])"></CSidebarNavItem>
</CSidebarNavDropdown>
</template>

<script>
import check from '@/repositories/global/check'

export default {
  name: 'MenuCatalogos',
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }
  }
}
</script>
