<template>
<b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
  <CCard class="shadow">
    <CCardHeader color="info p-1">
      <ActModalTable :id_modelo="$route.params.id" />
      <h4>
        Detalles del registro:
        <CLink :to="{ name: 'Editar Rol', params: { id: $route.params.id }}" v-if="permisos(['rol.edit'])" v-text="$route.params.id" />
        <span v-else v-text="$route.params.id" />
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
          <CCol sm="6">
            <CInput label="Última modificación por" type="text" placeholder="Última modificación por" v-model="form.updated_at_reg">
              <template #prepend-content><CIcon name="cil-envelope-open"/></template>
            </CInput>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="6">
            <CInput label="Rol" type="text" placeholder="Rol"  v-model="form.nom">
              <template #prepend-content><CIcon name="cilText"/></template>
            </CInput>
          </CCol>
          <CCol sm="6">
            <CInput label="Slug" type="text" placeholder="Slug" v-model="form.name">
              <template #prepend-content><CIcon name="cilText"/></template>
            </CInput>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CTextarea label="Descripción" placeholder="Descripción"  vertical rows="9" v-model="form.desc">
              <template #prepend-content><CIcon name="cilText"/></template>
            </CTextarea>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <label>Permisos *</label>
            <perfect-scrollbar style="height:30em;width:100%;margin:0px 0px 1% 0px">
              <b-list-group><b-list-group-item v-for="grupo in grup_permisos">
                <b-form-group><strong><label v-text="'Módulo: '+grupo.modulo" /></strong>
                  <b-form-checkbox-group 
                    v-model="form.permis"
                    :options="grupo.permisos"
                    name="checkbox-2a"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-list-group-item></b-list-group>
            </perfect-scrollbar>
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
import repoRol from './Repositories'
import repoPer from '../permiso/Repositories'
import check from '@/repositories/global/check'
import ActModalTable from '../actividad/ActModalTable'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'RolShow',
  components: {
    ActModalTable,
    Multiselect
  },
  data: () => {
    return {
      showForm: true,
      form: [],
      grup_permisos: [],
    }
  },
  mounted: function() {
    this.getRegistro()
    this.getPermisos();
  },
  methods: {
    goBack() { this.$router.go(-1) },
    permisos(permisos) {
      return check.permiso(permisos)
    },
    async getRegistro() {
      let self      = this;
      self.form     = await repoRol.getRegistro(self);
      self.showForm = false
    },
    async getPermisos() {
      let self      = this;
      self.grup_permisos = await repoPer.getAllPermisos(self)
      self.showForm = false
    },
  },
}
</script>
