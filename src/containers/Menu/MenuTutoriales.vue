<template>
<CSidebarNavDropdown name="Tutoriales" to="/tutoriales" icon="cibYoutube" v-if="permisos(['tutotial.create','tutotial.show','tutotial.edit','tutotial.destroy'])">
  <CSidebarNavItem name="Lista de tutoriales" to="/tutoriales" icon="cilList" v-if="permisos(['tutotial.create','tutotial.show','tutotial.edit','tutotial.destroy'])"></CSidebarNavItem>
  <CSidebarNavItem name="Registrar tutorial" to="/tutoriales/registrar" icon="cilPlus" v-if="permisos(['tutotial.create'])"></CSidebarNavItem>
</CSidebarNavDropdown>
</template>

<script>
import check from '@/repositories/global/check'

export default {
  name: 'MenuTutoriales',
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }
  }
}
</script>
