<template>
<CSidebarNavDropdown name="Quejas y Sugerencias" to="/quejas-y-sugerencias" icon="cilInbox" v-if="permisos(['quejaYSugerencia.create','quejaYSugerencia.show','quejaYSugerencia.edit', 'quejaYSugerencia.destroy'])">
  <CSidebarNavItem name="Lista de quejas y sugerencias" to="/quejas-y-sugerencias" icon="cilList" v-if="permisos(['quejaYSugerencia.create','quejaYSugerencia.show','quejaYSugerencia.edit', 'quejaYSugerencia.destroy'])"></CSidebarNavItem>
  <CSidebarNavItem name="Registrar" to="/quejas-y-sugerencias/registrar" icon="cilCheckCircle" v-if="permisos(['quejaYSugerencia.create'])"></CSidebarNavItem>
</CSidebarNavDropdown>
</template>

<script>
import check from '@/repositories/global/check'

export default {
  name: 'MenuQuejaYSugerencia',
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }
  }
}
</script>
