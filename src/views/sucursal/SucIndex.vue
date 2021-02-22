<template>
  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader class="p-1">
          <SucMenu :actSL="true" />
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
                      <CLink v-if="!permisos(['sucursal.show'])" @click="showRegistro(item.id)" v-text="item.suc" />
                      <span v-else v-text="item.suc" />
                    </td>
                  </template>
                  <template #editar="{item}">
                    <td><CLink :hidden="permisos(['sucursal.edit'])" @click="editRegistro(item.id)" class="btn btn-light"><CIcon name="cilPencil"/></CLink></td>
                  </template>
                  <template #eliminar="{item}">
                    <td><CLink :hidden="permisos(['sucursal.destroy'])" @click="deleteRegistro(item.id)" class="btn btn-danger"><CIcon name="cilTrash"/></CLink></td>
                  </template>
                </CDataTable>
              </perfect-scrollbar>
            </CCol>
          </CRow>
          <CPagination :pages="maxPages" :active-page.sync="activePage" style="float:right;" />
          <p v-text="texto" />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'
import check from '@/repositories/global/check'
import alert from '@/repositories/global/alert'
import SucMenu from './SucMenu'
import Swal from 'sweetalert2'
import repo from './Repositories'

export default {
  name: 'SucIndex',
  components: {
    SucMenu
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
      loading: false,
      texto: null,
    }
  },
  mounted: function() {
    this.getSucursales();
  },
  methods: {
    permisos(permisos) {
      return !check.permiso(permisos)
    },
    showRegistro(id) {
      repo.showRegistro(this,id)
    },
    editRegistro(id) {
      repo.editRegistro(this,id)
    },
    deleteRegistro(id) {
      Swal.fire({
        icon: 'info',
        title: '¿Estás seguro que quieres eliminar este registro?',
        html: 'Enviaras toda la información relacionada a este registro a la papelera de reciclaje.',
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#CB3234',
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if(result.isConfirmed) {
          let self = this;
          axios.post(self.$apiAdress+'/api/admin/sucursal/eliminar/'+id+'?token='+localStorage.getItem("api_token"), {
            _method: 'DELETE'
          })
          .then(function (response) {
            alert.response200(2, '¡Registro eliminado exitosamente!','')
            self.getSucursales();
          }).catch(function (error) {
            alert.responseCatch(error, 'Code #1004');
          });
        }
      })
    },
    getSucursales() {
      let self = this;
      self.loading = true
      self.items = [];
      
      axios.post(self.$apiAdress+'/api/admin/sucursal?token='+localStorage.getItem("api_token")+'&page='+self.activePage, {
        sorter:       self.sorter,
        tableFilter:  self.tableFilter,
        columnFilter: self.columnFilter,
        itemsLimit:   self.itemsLimit
      }).then(function (response) {
        self.texto = `Mostrando desde ${response.data.from} hasta ${response.data.to} de ${response.data.total} registros.`
        self.items = self.items.concat(response.data.data)
        self.maxPages = response.data.last_page
        self.loading = false
      }).catch(function (error) {
        self.loading = false
        alert.responseCatch(error, 'Code #1006') 
      });
    },
    changeItemsLimit(val) {
      this.itemsLimit = val;
      this.getSucursales();
    },
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
