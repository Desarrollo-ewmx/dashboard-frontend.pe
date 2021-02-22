<template>
<b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
  <CRow>
    <CCol col="12">
      <CCard>
        <CCardHeader color="info p-1">
          <h4>
            Detalles registro id:
            <CLink v-if="!permisos(['sucursal.show'])" @click="editRegistro($route.params.id)" v-text="$route.params.id" />
              <span v-else v-text="$route.params.id" />
          </h4>
        </CCardHeader>
        <CCardBody>
          <CRow v-if="form.log_nom != null">
            <b-img :src="form.log_rut+form.log_nom" alt="Imagen" height="48"/>
          </CRow>
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
        </CCardBody>
        <CCardFooter>
          <CRow class="content-center">
            <CCol>
              <CButton color="secondary" class="w-75" @click="goBack"><CIcon name="cilArrowThickToLeft"/> Regresar</CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</b-overlay>
</template>

<script>
import repo from './Repositories'
import check from '@/repositories/global/check'

export default {
  name: 'SucShow',
  data: () => {
    return {
      showForm: true,
      form: []
    }
  },
  mounted: function() {
    this.getRegistro()
  },
  methods: {
    goBack() { this.$router.go(-1) },
    permisos(permisos) {
      return !check.permiso(permisos)
    },
    editRegistro(id) {
      repo.editRegistro(this,id)
    },
    async getRegistro() {
      let self = this;
      self.form = await repo.getRegistro(self);
      self.showForm = false
    }
  },
}
</script>
