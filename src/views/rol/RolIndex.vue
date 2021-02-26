<template>
<CCard class="shadow">
  <CCardHeader class="p-1">
    <RolMenu :actRL="true" />
  </CCardHeader>
  <CCardBody>
    <CRow>
      <CCol sm="12">
        <perfect-scrollbar style="height:40em;width:100%;margin:0px 0px 1% 0px">
          <CDataTable :items="items" :column-filter-value.sync="columnFilter" :table-filter-value.sync="tableFilter" :loading="loading" :itemsPerPage="itemsLimit" index-column hover footer fixed striped responsive outlined table-column
            :fields="[ 
                      { key: 'id', label: 'ID' },
                      { key: 'suc', label: 'SUCURSAL' },
                      { key: 'ser_cot', label: 'SERIE' },
                      { key: 'created_at', label: 'FECHA DE REGISTRO' },
                      { key: 'editar', label: '' },
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
            <template #suc="{item}">
              <td>
                <CLink :to="{ name: 'Detalles Sucursal', params: { id: item.id }}" v-if="permisos(['sucursal.show', 'sucursal.edit'])" v-text="item.suc" />
                <span v-else v-text="item.suc" />
              </td>
            </template>
            <template #created_at-filter="{item}">
              <span class="pantallaMax985px">Desde: </span><input type="date" :value="startDate" @change="setDateFilter" class="mr-2" />
              <span class="pantallaMax985px">Hasta: </span><input type="date" :value="endDate" @change="e => setDateFilter(e, 'end')" />
            </template>
            <template #editar="{item}">
              <td><CLink :to="{ name: 'Editar Sucursal', params: { id: item.id }}" v-if="permisos(['sucursal.edit'])" class="btn btn-secondary"><CIcon name="cilPencil"/></CLink></td>
            </template>
            <template #eliminar="{item}">
              <td><CLink v-if="permisos(['sucursal.destroy'])" @click="deleteRegistro(item.id)" class="btn btn-danger"><CIcon name="cilTrash"/></CLink></td>
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
import repoRol from './Repositories'
import repoGlo from '@/repositories/global/global'
import RolMenu from './RolMenu'
import check from '@/repositories/global/check'
import alert from '@/repositories/global/alert'
import Swal from 'sweetalert2'

export default {
  name: 'SucIndex',
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
    this.getSucursales();
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    },
    async getSucursales() {
      let self      = this;
      self.loading  = true
      self.items    = [];
      let data      = await repoRol.getPagination(self)
      self.texto    = `Mostrando desde ${data.from} hasta ${data.to} de ${data.total} registros.`
      self.items    = self.items.concat(data.data)
      self.maxPages = data.last_page
      self.loading  = false
    },
    async deleteRegistro(id) {
      let result = await Swal.fire({
        icon: 'info',
        title: '¿Estás seguro que quieres eliminar este registro?',
        html: 'Enviaras toda la información relacionada a este registro a la papelera de reciclaje.',
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#CB3234',
        cancelButtonText: `Cancelar`,
      })

      if(result.value) {
        let self = this;
        let data = await repoRol.deleteRegistro(self, id)
        if(data != undefined) {
          await alert.response200(3, '¡Registro eliminado exitosamente!','')
          await self.getSucursales();
        }
      }
    },
    changeItemsLimit(val) {
      this.itemsLimit = val;
      this.getSucursales();
    },
    setDateFilter(e, end) {
      if(end) {
        this.endDate = e.target.value
      } else {
        this.startDate = e.target.value
      }
      this.getSucursales();
    }
  },
  watch: {
    activePage() {
      this.getSucursales();
    },
  	sorter: {
    	handler() {
      	this.getSucursales();
      },
      deep: true
    },
    tableFilter() {
      this.getSucursales();
    },
    columnFilter() {
      this.getSucursales();
    },
  },
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
