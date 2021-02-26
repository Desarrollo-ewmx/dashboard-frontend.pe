<template>
  <CHeaderNav>
    <CHeaderNavItem>
      <CButton @click="recargar()" color="secondary" class="mr-2" title="Recargar"><CIcon name="cilSync" /></CButton>
    </CHeaderNavItem>
    <CHeaderNavItem>
      <CSelect :options="sucursales" :value="suc_activo" @update:value="selectSucursal" class="mt-3" />
    </CHeaderNavItem>
    <CHeaderNavItem class="px-3">
      <button @click="() => $store.commit('darkMode', 'darkMode')" class="c-header-nav-btn">
        <CIcon v-if="$store.state.darkMode" name="cil-sun"/>
        <CIcon v-else name="cil-moon"/>
      </button>
    </CHeaderNavItem>
    <TheHeaderDropdownNotif/>
    <TheHeaderDropdownAccnt/>
    <CHeaderNavItem class="px-3">
      <button in-header class="c-header-nav-btn" @click="$store.commit('toggle', 'asideShow')">
        <CIcon size="lg" name="cil-applications-settings" class="mr-2"/>
      </button>
    </CHeaderNavItem>
  </CHeaderNav>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import TheHeaderDropdownNotif from './TheHeaderDropdownNotif'
import dash from '@/repositories/global/dashboard'

export default {
  name: 'MenuHeaderIzquierdo',
    components: {
    TheHeaderDropdownAccnt,
    TheHeaderDropdownNotif,
  },
  data: function(){
    return {
      sucursales: JSON.parse(localStorage.getItem("sucursales")),
      locale: localStorage.getItem("locale"),
      suc_activo: JSON.parse(localStorage.getItem("usuario")).id_suc_act
    }
  },
  methods: {
    recargar() {
      location.reload()
    },
    selectSucursal(option) {
      dash.dashboardUpdate('sucActiva', option)
    },
  }
}
</script>
