<template>
<b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
  <CCard class="shadow">
    <CCardHeader color="info p-1">
      <ActModalTable :id_modelo="$route.params.id" />
      <h4>
        Detalles del registro:<span v-text="$route.params.id" />
      </h4>
    </CCardHeader>
    <CCardBody>
      <fieldset disabled>
        <CRow>
          <CCol sm="6">
            <CInput label="Fecha de registro" type="text" placeholder="Fecha de registro" v-model="form.created_at">
              <template #prepend-content><CIcon name="cilCalendar"/></template>
            </CInput>
          </CCol>
          <CCol sm="6">
            <CInput label="Registrado por" type="text" placeholder="Registrado por" v-model="form.created_at_reg">
              <template #prepend-content><CIcon name="cil-envelope-open"/></template>
            </CInput>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="6">
            <CInput label="Fecha última modificación" type="text" placeholder="Fecha última modificación" v-model="form.updated_at">
              <template #prepend-content><CIcon name="cilCalendar"/></template>
            </CInput>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CTextarea label="Observaciones" placeholder="Observaciones"  maxlength="30000" vertical rows="9" v-model="form.obs">
              <template #prepend-content><CIcon name="cilText"/></template>
            </CTextarea>
          </CCol>
       </CRow>
      </fieldset>
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
import repoQys from './Repositories'
import ActModalTable from '../actividad/ActModalTable'

export default {
  name: 'QysShow',
  components: {
    ActModalTable
  },
  data: () => {
    return {
      showForm: true,
      form: [],
    }
  },
  mounted: function() {
    this.getRegistro()
  },
  methods: {
    goBack() { this.$router.go(-1) },
    async getRegistro() {
      let self      = this;
      self.form     = await repoQys.getRegistro(self);
      self.showForm = false
    }
  }
}
</script>
