<template>
<CNav variant="pills">
  <CNavItem v-if="permisos(['quejaYSugerencia.create','quejaYSugerencia.show','quejaYSugerencia.edit', 'quejaYSugerencia.destroy'])" :active="actQL" to="/quejas-y-sugerencias" :class="actQL ? 'text-white ' : ''">
    <CIcon name="cilList"/> Lista de quejas y sugerencias
  </CNavItem>
  <CNavItem v-if="permisos(['quejaYSugerencia.create'])" :active="actQC" to="/quejas-y-sugerencias/registrar" :class="actQC ? 'text-white' : ''">
    <b-icon icon="plus-circle"></b-icon> Registrar
  </CNavItem>
</CNav>
</template>

<script>
import check from '@/repositories/global/check'

export default {
  name: 'QysMenu',
  props:{
    actQL: Boolean,
    actQC: Boolean,
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }   
  },
}
</script>