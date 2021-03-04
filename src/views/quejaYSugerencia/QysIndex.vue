<template>
<CCard class="shadow">
  <CCardHeader class="p-1">
    <QysMenu :actQL="true" />
  </CCardHeader>
  <CCardBody>
    <CRow>
      <CCol sm="12">
        <perfect-scrollbar style="height:40em;width:100%;margin:0px 0px 1% 0px">
          <CDataTable :items="items" :column-filter-value.sync="columnFilter" :table-filter-value.sync="tableFilter" :loading="loading" :itemsPerPage="itemsLimit" index-column hover footer fixed striped responsive outlined table-column
            :fields="[ 
                      { key: 'id', label: 'ID' },
                      { key: 'email_registro', label: 'USUARIO' },
                      { key: 'tip', label: 'TIPO' },
                      { key: 'depto', label: 'DEPARTAMENTO' },
                      { key: 'obs', label: 'OBSERVACIONES' },
                      { key: 'created_at', label: 'FECHA DE REGISTRO' },
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
            <template #created_at-filter="{item}">
              <span class="pantallaMax985px">Desde: </span><input type="date" :value="startDate" @change="setDateFilter" class="mr-2" />
              <span class="pantallaMax985px">Hasta: </span><input type="date" :value="endDate" @change="e => setDateFilter(e, 'end')" />
            </template>
            <template #id="{item}">
              <td title="Detalles">
                <CLink :to="{ name: 'Detalles Queja y Sugerencia', params: { id: item.id }}" v-if="permisos(['quejaYSugerencia.show', 'quejaYSugerencia.edit'])" v-text="item.id" />
                <span v-else v-text="item.id" />
              </td>
            </template>
            <template #email_registro="{item}">
              <td>
                <CLink :to="{ name: 'Detalles Usuario', params: { id: item.user_id }}" v-if="permisos(['usuario.show', 'usuario.edit'])" target="_blank">{{ item.name }} ({{ item.email_registro }})</CLink>
                <span v-else>{{ item.name }} ({{ item.email_registro }})</span>
              </td>
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
import repoQys from './Repositories'
import repoGlo from '@/repositories/global/global'
import QysMenu from './QysMenu'
import check from '@/repositories/global/check'

export default {
  name: 'QysIndex',
  components: {
    QysMenu
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
    this.getQuejasYSugerencias();
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    },
    async getQuejasYSugerencias() {
      let self      = this;
      self.loading  = true
      self.items    = [];
      let data      = await repoQys.getPagination(self)
      if(isNaN(parseFloat(data.from))) { data.from = 0; }
      if(isNaN(parseFloat(data.to))) { data.to = 0; }
      self.texto    = `Mostrando desde ${data.from} hasta ${data.to} de ${data.total} registros.`
      self.items    = self.items.concat(data.data)
      self.maxPages = data.last_page
      self.loading  = false
    },
    changeItemsLimit(val) {
      this.itemsLimit = val;
      this.getQuejasYSugerencias();
    },
    setDateFilter(e, end) {
      if(end) {
        this.endDate = e.target.value
      } else {
        this.startDate = e.target.value
      }
      this.getQuejasYSugerencias();
    }
  },
  watch: {
    activePage() {
      this.getQuejasYSugerencias();
    },
  	sorter: {
    	handler() {
      	this.getQuejasYSugerencias();
      },
      deep: true
    },
    tableFilter() {
      this.getQuejasYSugerencias();
    },
    columnFilter() {
      this.getQuejasYSugerencias();
    },
  },
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
