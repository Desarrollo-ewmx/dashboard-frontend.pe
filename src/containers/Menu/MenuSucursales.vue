<template>
<CSidebarNavDropdown name="Sucursales" to="/sucursales" icon="cilBuilding" v-if="permisos(['sucursal.create','sucursal.show','sucursal.edit','sucursal.destroy'])">
  <CSidebarNavItem name="Lista de sucursales" to="/sucursales" icon="cilList" v-if="permisos(['sucursal.create','sucursal.show','sucursal.edit','sucursal.destroy'])"></CSidebarNavItem>
  <CSidebarNavItem name="Registrar sucursal" to="/sucursales/registrar" icon="cilPlus" v-if="permisos(['sucursal.create'])"></CSidebarNavItem>
</CSidebarNavDropdown>
</template>

<script>
import check from '@/repositories/global/check'

export default {
  name: 'MenuSucursales',
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }
  }
}
</script>
