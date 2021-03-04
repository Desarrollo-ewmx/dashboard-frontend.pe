<template>
<CCard class="shadow">
  <CCardHeader class="p-1">
    <RolMenu :actPL="true" />
  </CCardHeader>
  <CCardBody>
    <CRow>
      <CCol sm="12">
        <perfect-scrollbar style="height:40em;width:100%;margin:0px 0px 1% 0px">
          <CDataTable :items="items" :column-filter-value.sync="columnFilter" :table-filter-value.sync="tableFilter" :loading="loading" :itemsPerPage="itemsLimit" index-column hover footer fixed striped responsive outlined table-column
            :fields="[ 
                      { key: 'id', label: 'ID' },
                      { key: 'mod', label: 'MÓDULO' },
                      { key: 'nom', label: 'PERMISO' },
                      { key: 'desc', label: 'DESCRIPCIÓN' },
                      { key: 'created_at', label: 'FECHA DE REGISTRO' },
                      { key: 'editar', label: '' },
                    ]"
            :noItemsView="{ 
                    noResults: 'No hay resultados de filtrado disponibles', 
                    noItems: 'No hay registros disponibles',
                  }"
            :items-per-page-select="{ label: 'Registros por pagina:', values: ['15','30','50','100'] }"
            :table-filter="{ external: true, lazy: true, placeholder: 'Filtrar', label: 'Filtrar:' }"
            :sorter="{ external: true, resetable: true }"
            :columnFilter="{ external: true, lazy: true }"
            @pagination-change="changeItemsLimit"
            :sorter-value.sync="sorter"
            >








            <template #nom="{item}">
              <td>
                <CLink :to="{ name: 'Detalles Rol', params: { id: item.id }}" v-if="permisos(['sucursal.show', 'sucursal.edit'])" v-text="item.nom" />
                <span v-else v-text="item.nom" />
              </td>
            </template>
            <template #created_at-filter="{item}">
              <span class="pantallaMax985px">Desde: </span><input type="date" :value="startDate" @change="setDateFilter" class="mr-2" />
              <span class="pantallaMax985px">Hasta: </span><input type="date" :value="endDate" @change="e => setDateFilter(e, 'end')" />
            </template>
            <template #editar="{item}">
              <td><CLink :to="{ name: 'Editar Permiso', params: { id: item.id }}" v-if="permisos(['sucursal.edit'])" class="btn btn-secondary"><CIcon name="cilPencil"/></CLink></td>
            </template>
           








          </CDataTable>
        </perfect-scrollbar>
      </CCol>
    </CRow>
    <CPagination :pages="maxPages" :active-page.sync="activePage" style="float:right;" />
    <p v-text="texto" />
  </CCardBody>
</CCard>
</template>

<script>
import repoPer from './Repositories'
import repoGlo from '@/repositories/global/global'
import RolMenu from '../rol/RolMenu'
import check from '@/repositories/global/check'

export default {
  name: 'PerIndex',
  components: {
    RolMenu
  },
  data () {
    return {
      items: [],
      activePage: 1,
      maxPages: 1,
      sorter: {column: '', asc: false},
      tableFilter: '',
      columnFilter: {},
      itemsLimit: 50,
      startDate: new Date('2019-01-01').toISOString().substr(0, 10),
      endDate: repoGlo.diaMasAFecha(),
      loading: false,
      texto: null,
    }
  },
  mounted: function() {
    this.getPermisos();
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    },
    async getPermisos() {
      let self      = this;
      self.loading  = true
      self.items    = [];
      let data      = await repoPer.getPagination(self)
      if(isNaN(parseFloat(data.from))) { data.from = 0; }
      if(isNaN(parseFloat(data.to))) { data.to = 0; }
      self.texto    = `Mostrando desde ${data.from} hasta ${data.to} de ${data.total} registros.`
      self.items    = self.items.concat(data.data)
      self.maxPages = data.last_page
      self.loading  = false
    },
    changeItemsLimit(val) {
      this.itemsLimit = val;
      this.getPermisos();
    },
    setDateFilter(e, end) {
      if(end) {
        this.endDate = e.target.value
      } else {
        this.startDate = e.target.value
      }
      this.getPermisos();
    }
  },
  watch: {
    activePage() {
      this.getPermisos();
    },
  	sorter: {
    	handler() {
      	this.getPermisos();
      },
      deep: true
    },
    tableFilter() {
      this.getPermisos();
    },
    columnFilter() {
      this.getPermisos();
    },
  },
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
