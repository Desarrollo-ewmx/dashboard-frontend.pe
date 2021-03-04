<template>
<CSidebarNavDropdown name="Usuarios" to="/usuarios" icon="cilUser" v-if="permisos(['usuario.create','usuario.show','usuario.edit', 'usuario.destroy'])">
  <CSidebarNavItem name="Lista de usuarios" to="/usuarios" icon="cilList" v-if="permisos(['usuario.create','usuario.show','usuario.edit', 'usuario.destroy'])"></CSidebarNavItem>
  <CSidebarNavItem name="Registrar usuario" to="/usuarios/registrar" icon="cilPlus" v-if="permisos(['usuario.create'])"></CSidebarNavItem>
</CSidebarNavDropdown>
</template>

<script>
import check from '@/repositories/global/check'

export default {
  name: 'MenuUsuarios',
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }
  }
}
</script>
