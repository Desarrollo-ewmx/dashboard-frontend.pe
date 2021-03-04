<template>
  <CSidebar :minimize="minimize" unfoldable :show="show" @update:show="(value) => $store.commit('set', ['sidebarShow', value])">
    <CSidebarBrand class="d-md-down-none" to="/">
    <b-img v-if="sucursal.log_nom != null" :src="sucursal.log_rut+sucursal.log_nom" class="c-sidebar-brand-full" alt="Logo" height="35" size="custom-size" viewBox="0 0 556 134"/>
    <b-img v-if="sucursal.log_nom != null" :src="sucursal.log_rut+sucursal.log_nom" class="c-sidebar-brand-minimized" alt="Logo" height="35" size="custom-size" viewBox="0 0 110 134"/>
    </CSidebarBrand>

    <CSidebarNav>
      <CSidebarNavDropdown name="Configuración" to="/configuracion" icon="cilSettings" v-if="permisos([])">
        <CSidebarNavItem :name="sistema.emp_abrev" to="/sistema" icon="cilGlobeAlt" v-if="permisos(['sistema.edit','sistema.show'])"></CSidebarNavItem>
        <MenuTutoriales />
        <CSidebarNavItem name="Registro de actividades" to="/actividades" icon="cilFolder" v-if="permisos(['actividad.show','actividad.destroy'])"></CSidebarNavItem>
        <MenuCatalogos />
      </CSidebarNavDropdown>
      <MenuSucursales />
      <MenuUsuarios />
      <MenuRoles />
      <CSidebarNavItem name="Papelera de reciclaje" to="/papelera" icon="cibArchiveOfOurOwn" v-if="permisos(['papeleraDeReciclaje.show', 'papeleraDeReciclaje.destroy', 'papeleraDeReciclaje.restore'])"></CSidebarNavItem>
    </CSidebarNav>

    <CSidebarMinimizer class="c-d-md-down-none" @click.native="$store.commit('toggle', 'sidebarMinimize')" />
  </CSidebar>
</template>

<script>
import check from '@/repositories/global/check'
import MenuTutoriales from './Menu/MenuTutoriales'
import MenuCatalogos from './Menu/MenuCatalogos'
import MenuUsuarios from './Menu/MenuUsuarios'
import MenuSucursales from './Menu/MenuSucursales'
import MenuRoles from './Menu/MenuRoles'

export default {
  name: 'TheSidebar',
  components: {
    MenuTutoriales,
    MenuCatalogos,
    MenuUsuarios,
    MenuSucursales,
    MenuRoles
  },
  data () {
    return {
      sucursal: JSON.parse(localStorage.getItem("sucursal")),
      sistema: JSON.parse(localStorage.getItem("sistema")),
    }
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  },
  mounted () {
    this.$root.$on('toggle-sidebar', () => {
      const sidebarOpened = this.show === true || this.show === 'responsive'
      this.show = sidebarOpened ? false : 'responsive'
    })
    this.$root.$on('toggle-sidebar-mobile', () => {
      const sidebarClosed = this.show === 'responsive' || this.show === false
      this.show = sidebarClosed ? true : 'responsive'
    })
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }
  }
}
</script>
