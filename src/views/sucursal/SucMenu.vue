<template>
<CNav variant="pills">
  <CNavItem v-if="permisos(['sucursal.create','sucursal.show','sucursal.edit', 'sucursal.destroy'])" :active="actSL" to="/sucursales" :class="actSL ? 'text-white ' : ''">
    <CIcon name="cilList"/> Lista de sucursales
  </CNavItem>
  <CNavItem v-if="permisos(['sucursal.create'])" :active="actSC" to="/sucursales/registrar" :class="actSC ? 'text-white' : ''">
    <b-icon icon="plus-circle"></b-icon> Registrar sucursal
  </CNavItem>
</CNav>
</template>

<script>
import check from '@/repositories/global/check'

export default {
  name: 'SucMenu',
  props:{
    actSL: Boolean,
    actSC: Boolean,
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }   
  },
}
</script>