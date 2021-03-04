<template>
<CNav variant="pills">
  <CNavItem v-if="permisos(['rol.create','rol.show','rol.edit', 'rol.destroy'])" :active="actRL" to="/roles" :class="actRL ? 'text-white ' : ''">
    <CIcon name="cilList"/> Lista de roles
  </CNavItem>
  <CNavItem v-if="permisos(['rol.create'])" :active="actRC" to="/roles/registrar" :class="actRC ? 'text-white' : ''">
    <b-icon icon="plus-circle"></b-icon> Registrar rol
  </CNavItem>
    <CNavItem v-if="permisos(['rol.create','rol.show','rol.edit'])" :active="actPL" to="/permisos" :class="actPL ? 'text-white ' : ''">
    <CIcon name="cilList"/> Lista de permisos
  </CNavItem>
</CNav>
</template>

<script>
import check from '@/repositories/global/check'

export default {
  name: 'RolMenu',
  props:{
    actRL: Boolean,
    actRC: Boolean,
    actPL: Boolean
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }   
  },
}
</script>