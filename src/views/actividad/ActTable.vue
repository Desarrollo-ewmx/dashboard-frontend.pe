<template>
<CCardBody>
  <CRow>
    <CCol sm="12">
      <perfect-scrollbar style="height:40em;width:100%;margin:0px 0px 1% 0px">
        <CDataTable :items="items" :column-filter-value.sync="columnFilter" :table-filter-value.sync="tableFilter" :loading="loading" :itemsPerPage="itemsLimit" index-column hover footer fixed striped responsive outlined table-column
          :fields="[ 
                    { key: 'id', label: 'ID' },
                    { key: 'email_registro', label: 'CORREO DE USUARIO' },
                    { key: 'mod', label: 'MÓDULO' },
                    { key: 'actividad_id', label: 'REGISTRO' },
                    { key: 'inpu', label: 'INPUT' },
                    { key: 'ant', label: 'ANTERIOR' },
                    { key: 'nuev', label: 'NUEVO' },
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
          <template #email_registro="{item}">
            <td>
              <CLink :to="{ name: 'Detalles Usuario', params: { id: item.user_id }}" v-if="permisos(['usuario.show'])" target="_blank" v-text="item.email_registro" />
              <span v-else>{{ item.email_registro }}</span>
            </td>
          </template>
          <template #actividad_id="{item}">
            <td>
              <CLink :to="{ name: item.rut, params: { id: item.id }}" v-if="permisos(item.perm.split(','))" target="_blank" v-text="item.actividad_id" />
              <span v-else>{{ item.actividad_id }}</span>
            </td>
          </template>
          <template #created_at-filter="{item}">
            <span class="pantallaMax985px">Desde: </span><input type="date" :value="startDate" @change="setDateFilter" class="mr-2" />
            <span class="pantallaMax985px">Hasta: </span><input type="date" :value="endDate" @change="e => setDateFilter(e, 'end')" />
          </template>
        </CDataTable>
      </perfect-scrollbar>
    </CCol>
  </CRow>
    <CPagination :pages="maxPages" :active-page.sync="activePage" style="float:right;" />
    <p v-text="texto" />
</CCardBody>
</template>

<script>
import axios from 'axios'
import alert from '@/repositories/global/alert'
import check from '@/repositories/global/check'
import repoGlo from '@/repositories/global/global'

export default {
  name: 'ActTable',
  props: ['id_modelo'],
  data() {
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
      texto: null
    }
  },
  mounted: function() {
    this.getActividades();
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    },
    getActividades() {
      let self = this;
      self.loading = true
      self.items = [];
      
      axios.post(self.$apiAdress+'/api/admin/actividad?token='+localStorage.getItem("api_token")+'&page='+self.activePage, {
        sorter:       self.sorter,
        tableFilter:  self.tableFilter,
        columnFilter: self.columnFilter,
        itemsLimit:   self.itemsLimit,
        id_modelo:    self.id_modelo,
        startDate:    self.startDate,
        endDate:      self.endDate
      }).then(function (response) {
        if(isNaN(parseFloat(response.data.from))) { response.data.from = 0; }
        if(isNaN(parseFloat(response.data.to))) { response.data.to = 0; }
        self.texto = `Mostrando desde ${response.data.from} hasta ${response.data.to} de ${response.data.total} registros.`
        self.items = self.items.concat(response.data.data)
        self.maxPages = response.data.last_page
        self.loading = false
      }).catch(function (error) {
        self.loading = false
        alert.responseCatch(error, 'Code #1002') 
      });
    },
    changeItemsLimit(val) {
      this.itemsLimit = val;
      this.getActividades();
    },
    setDateFilter(e, end) {
      if(end) {
        this.endDate = e.target.value
      } else {
        this.startDate = e.target.value
      }
      this.getActividades();
    }
  },
  watch: {
    activePage() {
      this.getActividades();
    },
  	sorter: {
    	handler() {
      	this.getActividades();
      },
      deep: true
    },
    tableFilter() {
      this.getActividades();
    },
    columnFilter() {
      this.getActividades();
    },
  },
}
</script>
