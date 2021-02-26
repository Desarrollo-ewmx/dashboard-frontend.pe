<template>
  <CNav variant="pills">
    <CNavItem v-if="permisos(['catalogo.create','catalogo.show','catalogo.edit', 'catalogo.destroy'])" :active="actCL" to="/catalogos" :class="actCL ? 'text-white ' : ''">
      <CIcon name="cilList"/> Lista de catálogos
    </CNavItem>
    <CNavItem v-if="permisos(['catalogo.create'])" :active="actCC" to="/catalogos/registrar" :class="actCC ? 'text-white' : ''">
      <b-icon icon="plus-circle"></b-icon> Registrar catálogo
    </CNavItem>
  </CNav>
</template>

<script>
import check from '@/repositories/global/check'

export default {
  name: 'SucMenu',
  props:{
    actCL: Boolean,
    actCC: Boolean,
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }   
  },
}
</script>