<template>
<CCard class="shadow">
  <CCardBody>
    <CRow>
      <CCol sm="12">
        <perfect-scrollbar style="height:40em;width:100%;margin:0px 0px 1% 0px">
          <CDataTable :items="items" :column-filter-value.sync="columnFilter" :table-filter-value.sync="tableFilter" :loading="loading" :itemsPerPage="itemsLimit" index-column hover footer fixed striped responsive outlined table-column
            :fields="[ 
                      { key: 'id', label: 'ID' },
                      { key: 'mod', label: 'MÓDULO' },
                      { key: 'papelera_id', label: 'REGISTRO' },
                      { key: 'created_at', label: 'FECHA' },
                      { key: 'id_fk', label: 'ID FK' },
                      { key: 'email_registro', label: 'USUARIO' },
                      { key: 'restaurar', label: '' },
                      { key: 'eliminar', label: '' },
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
            <template #papelera_id="{item}">
              <td><span>{{item.papelera_id}} ({{item.reg}})</span></td>
            </template>
            <template #email_registro="{item}">
              <td><span>{{item.name}} ({{item.email_registro}})</span></td>
            </template>
            <template #restaurar="{item}">
              <td><CLink v-if="permisos(['papeleraDeReciclaje.restore'])" @click="restoreRegistro(item.id)" class="btn btn-secondary"><CIcon name="cilWindowRestore"/></CLink></td>
            </template>
            <template #eliminar="{item}">
              <td><CLink v-if="permisos(['papeleraDeReciclaje.destroy'])" @click="deleteRegistro(item.id)" class="btn btn-danger"><CIcon name="cilTrash"/></CLink></td>
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
import repoSuc from './Repositories'
import repoGlo from '@/repositories/global/global'
import check from '@/repositories/global/check'
import alert from '@/repositories/global/alert'
import Swal from 'sweetalert2'

export default {
  name: 'PapIndex',
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
    this.getRegistros();
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    },
    async getRegistros() {
      let self      = this;
      self.loading  = true
      self.items    = [];
      let data      = await repoSuc.getPagination(self)
      if(isNaN(parseFloat(data.from))) { data.from = 0; }
      if(isNaN(parseFloat(data.to))) { data.to = 0; }
      self.texto    = `Mostrando desde ${data.from} hasta ${data.to} de ${data.total} registros.`
      self.items    = self.items.concat(data.data)
      self.maxPages = data.last_page
      self.loading  = false
    },
    async restoreRegistro(id) {
      let result = await Swal.fire({
        icon: 'info',
        title: '¿Estás seguro que quieres restaurar este registro?',
        html: '',
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: 'Restaurar',
        confirmButtonColor: '#CB3234',
        cancelButtonText: `Cancelar`,
      })

      if(result.value) {
        let self = this;
        let data = await repoSuc.restoreRegistro(self, id)
        if(data != undefined) {
          await alert.response200(3, '¡Registro restaurado exitosamente!','')
          await self.getRegistros();
        }
      }
    },
    async deleteRegistro(id) {
      let result = await Swal.fire({
        icon: 'info',
        title: '¿Estás seguro que quieres eliminar este registro?',
        html: 'Eliminaras permanentemente este registro.',
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#CB3234',
        cancelButtonText: `Cancelar`,
      })

      if(result.value) {
        let self = this;
        let data = await repoSuc.deleteRegistro(self, id)
        if(data != undefined) {
          await alert.response200(3, '¡Registro eliminado exitosamente!','')
          await self.getRegistros();
        }
      }
    },
    changeItemsLimit(val) {
      this.itemsLimit = val;
      this.getRegistros();
    },
    setDateFilter(e, end) {
      if(end) {
        this.endDate = e.target.value
      } else {
        this.startDate = e.target.value
      }
      this.getRegistros();
    }
  },
  watch: {
    activePage() {
      this.getRegistros();
    },
  	sorter: {
    	handler() {
      	this.getRegistros();
      },
      deep: true
    },
    tableFilter() {
      this.getRegistros();
    },
    columnFilter() {
      this.getRegistros();
    },
  },
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
