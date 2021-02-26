<template>
<b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
  <CCard class="shadow">
    <CCardHeader color="info p-1">
      <ActModalTable :id_modelo="$route.params.id" />
      <h4>
        Detalles del registro:
        <CLink :to="{ name: 'Editar Sucursal', params: { id: $route.params.id }}" v-if="permisos(['sucursal.edit'])" v-text="$route.params.id" />
        <span v-else v-text="$route.params.id" />
      </h4>
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol sm="3">
          <b-card v-if="form.log_nom != null" :img-src="form.log_rut+form.log_nom" style="max-width:20rem;" class="p-0 m-0" img-alt="Image" img-top no-body />
          <b-card v-else :img-src="sistema.def_img_rut+sistema.def_img_nom" style="max-width:20rem;" class="p-0 m-0" img-alt="Image" img-top no-body />
        </CCol>
        <CCol sm="9">
          <CRow>
            <CCol sm="6">
              <CInput label="Fecha de registro" type="text" placeholder="Fecha de registro" v-model="form.created_at" :disabled="true">
                <template #prepend-content><CIcon name="cilCalendar"/></template>
              </CInput>
            </CCol>
            <CCol sm="6">
              <CInput label="Registrado por" type="text" placeholder="Registrado por" v-model="form.created_at_reg" :disabled="true">
                <template #prepend-content><CIcon name="cil-envelope-open"/></template>
              </CInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <CInput label="Fecha última modificación" type="text" placeholder="Fecha última modificación" v-model="form.updated_at" :disabled="true">
                <template #prepend-content><CIcon name="cilCalendar"/></template>
              </CInput>
            </CCol>
            <CCol sm="6">
              <CInput label="Última modificación por" type="text" placeholder="Última modificación por" v-model="form.updated_at_reg" :disabled="true">
                <template #prepend-content><CIcon name="cil-envelope-open"/></template>
              </CInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <CInput label="Sucursal" type="text" placeholder="Sucursal" v-model="form.suc" :disabled="true">
                <template #prepend-content><CIcon name="cilText"/></template>
              </CInput>
            </CCol>
            <CCol sm="6">
              <CInput label="Serie" type="text" placeholder="Serie" v-model="form.ser_cot" :disabled="true">
                <template #prepend-content><CIcon name="cilText"/></template>
              </CInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <CInput label="Dirección" type="text" placeholder="Dirección" v-model="form.direc" :disabled="true">
                <template #prepend-content><CIcon name="cilText"/></template>
              </CInput>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter>
      <CRow class="content-center">
        <CCol>
          <CButton color="secondary" class="w-75" @click="goBack"><CIcon name="cilArrowThickToLeft"/> Regresar</CButton>
        </CCol>
      </CRow>
    </CCardFooter>
  </CCard>
</b-overlay>
</template>

<script>
import repoSuc from './Repositories'
import check from '@/repositories/global/check'
import ActModalTable from '../actividad/ActModalTable'

export default {
  name: 'SucShow',
  components: {
    ActModalTable
  },
  data: () => {
    return {
      showForm: true,
      form: [],
      sistema: JSON.parse(localStorage.getItem("sistema")),
    }
  },
  mounted: function() {
    this.getRegistro()
  },
  methods: {
    goBack() { this.$router.go(-1) },
    permisos(permisos) {
      return check.permiso(permisos)
    },
    async getRegistro() {
      let self = this;
      self.form = await repoSuc.getRegistro(self);
      self.showForm = false
    }
  },
}
</script>
