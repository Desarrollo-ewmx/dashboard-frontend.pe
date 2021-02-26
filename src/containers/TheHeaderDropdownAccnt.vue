<template>
  <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img :src="getFotoPerfil" class="c-avatar-img" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Cuenta</strong>
    </CDropdownHeader>
    <CDropdownItem to="/perfil/recordatorios">
      <CIcon name="cil-task" /> Recordatorios
      <CBadge color="danger" class="ml-auto">{{ countRecord }}</CBadge>
    </CDropdownItem>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Configuraciones</strong>
    </CDropdownHeader>
    <CDropdownItem to="/perfil/detalles">
      <CIcon name="cil-user" /> Perfil 
    </CDropdownItem>
    <CDropdownItem to="/perfil/tablero">
      <CIcon name="cilSettings" /> Tablero
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem @click="logout()">
      <CIcon name="cil-lock-locked" /> Cerrar sesión
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import axios from 'axios'
import alert from '@/repositories/global/alert'

export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return {
      countRecord: 42,
    }
  },
  computed: {
    getFotoPerfil() {
      if(JSON.parse(localStorage.getItem("usuario")).img_nom == null)
        return JSON.parse(localStorage.getItem("sistema")).def_img_perf_rut + JSON.parse(localStorage.getItem("sistema")).def_img_perf_nom
      else
        return JSON.parse(localStorage.getItem("usuario")).img_rut + JSON.parse(localStorage.getItem("usuario")).img_nom
    },
  },
  methods:{
    logout(){
      let self = this;
      axios.post( this.$apiAdress + '/api/logout?token=' + localStorage.getItem("api_token"),{})
      .then(function (response) {
        localStorage.clear();
        self.$router.push({ path: '/login' });
      }).catch(function (error) {
        alert.responseCatch(error, 'Code #1000')
      });
    },
    
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>
