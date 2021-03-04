<template>
<CSidebarNavDropdown name="Roles" to="/roles" icon="cilLockLocked" v-if="permisos(['rol.create','rol.show','rol.edit', 'rol.destroy'])">
  <CSidebarNavItem name="Lista de roles" to="/roles" icon="cilList" v-if="permisos(['rol.create','rol.show','rol.edit', 'rol.destroy'])"></CSidebarNavItem>
  <CSidebarNavItem name="Registrar rol" to="/roles/registrar" icon="cilCheckCircle" v-if="permisos(['rol.create'])"></CSidebarNavItem>
  <CSidebarNavItem name="Lista de permisos" to="/permisos" icon="cilList" v-if="permisos(['rol.create','rol.show','rol.edit'])"></CSidebarNavItem>
</CSidebarNavDropdown>
</template>

<script>
import check from '@/repositories/global/check'

export default {
  name: 'MenuRoles',
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }
  }
}
</script>
