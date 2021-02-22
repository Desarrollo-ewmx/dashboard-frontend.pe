<template>
  <b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader class="p-1">
          <SucMenu :actSC="true" />
        </CCardHeader>
        <CForm @submit.prevent="store()" method="POST">
          <CCardBody>
            <CRow v-if="errors != null" class="alert alert-danger p-0 m-0">
              <CCol sm="12"><ul><li class=" text-danger" v-for="error in errors">{{ error[0] }}</li></ul></CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput label="Sucursal *" type="text" placeholder="Sucursal" maxlength="50" class="mb-0" :lazy="false" :value.sync="$v.form.suc.$model" :isValid="checkIfValid('suc')">
                  <template #prepend-content><CIcon name="cilText"/></template>
                </CInput>
                <span class="text-danger float-right" v-if="!$v.form.suc.required">Este es un campo obligatorio.</span>
                <span class="text-danger float-right" v-if="!$v.form.suc.maxLength">Este campo no debe contener más de {{$v.form.suc.$params.maxLength.max }} caracteres.</span>
              </CCol>
              <CCol sm="6">
                <CFormGroup wrapperClasses="input-group pt-2">
                  <template #prepend-content><CIcon name="cilList"/></template>
                  <template #append><CButton color="secondary" @click="getSeries()" title="Recargar"><CIcon name="cilLoop"/></CButton><CatModalCreate/></template>
                  <template #label>Serie *</template>
                  <template #input>
                    <multiselect
                      v-model="$v.form.ser_cot.$model"
                      :options="series"
                      :group-select="true"
                      tag-placeholder="Sin coincidencias"
                      placeholder="Buscar . . ."
                      select-label="Seleccionar"
                      selected-label="Seleccionado"
                      deselect-label="Quitar selección"
                      label="text"
                      :taggable="true"
                      class="form-control border-0 p-0 m-0"
                    />
                  </template>
                </CFormGroup>
                <span class="text-danger float-right" v-if="!$v.form.ser_cot.required">Este es un campo obligatorio.</span>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput label="Dirección *" type="text" placeholder="Dirección" maxlength="200" class="mb-0" :lazy="false" :value.sync="$v.form.direc.$model" :isValid="checkIfValid('direc')">
                  <template #prepend-content><CIcon name="cilText"/></template>
                </CInput>
                <span class="text-danger float-right" v-if="!$v.form.direc.required">Este es un campo obligatorio.</span>
                <span class="text-danger float-right" v-if="!$v.form.direc.maxLength">Este campo no debe contener más de {{$v.form.direc.$params.maxLength.max }} caracteres.</span>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow class="content-center">
              <CCol>
                <CButton color="secondary" class="w-75" @click="goBack"><CIcon name="cilArrowThickToLeft"/> Regresar</CButton>
              </CCol>
              <CCol>
                <b-spinner label="Loading..." variant="primary" :hidden="spinner"></b-spinner>
                <CButton type="submit" color="primary" class="w-100" :disabled="!isValid || submitted" :hidden="submitted"><CIcon name="cilSave"/> Registrar</CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CForm>
      </CCard>
    </CCol>
  </CRow>
</b-overlay>
</template>

<script>
import axios from 'axios'
import repo from './Repositories'
import alert from '@/repositories/global/alert'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { validationMixin } from "vuelidate"
import { required, maxLength } from "vuelidate/lib/validators"
import SucMenu from './SucMenu'
import CatModalCreate from '../configuracion/catalogo/CatModalCreate'

export default {
  name: 'SucCreate',
  components: {
    SucMenu,
    Multiselect,
    CatModalCreate
  },
  data() {
    return {
      submitted: false,
      spinner: true,
      showForm: true,
      form: this.getEmptyForm(),
      errors: null,
      series: []
    }
  },
  mounted: function(){
    this.getSeries()
  },
  computed: {
    formString() { return JSON.stringify(this.form, null, 4) },
    isValid() { return !this.$v.form.$invalid },
    isDirty() { return this.$v.form.$anyDirty },
  },
  mixins: [validationMixin],
  validations: {
    form: {
      suc: { required, maxLength: maxLength(50) },
      ser_cot: { required },
      direc: { required, maxLength: maxLength(200) }
    },
  },
  methods: {
    goBack() { this.$router.go(-1) },
    getEmptyForm() {
      return {
        suc: '',
        direc: '',
        ser_cot: '',
      }
    },
    clearForm() {
      let self = this;
      self.form.suc = ''
      self.form.direc = ''
      self.form.ser_cot = ''
    },
    checkIfValid (fieldName) {
      const field = this.$v.form[fieldName]
      if (!field.$dirty) {
        return null
      } 
      return !(field.$invalid || field.$model === '')
    },
    store() {
      let self        = this;
      self.submitted  = true
      self.spinner    = false
      self.errors     = null
      let val_ant     = self.form.ser_cot
      self.form.ser_cot = self.form.ser_cot.value

      axios.post(this.$apiAdress+'/api/admin/sucursal/almacenar?token='+localStorage.getItem("api_token"), self.form
      ).then(function (response) {
        self.clearForm()
        self.submitted = false
        self.spinner = true
        alert.response200(1, '¡Registrado exitosamente!', `<a href="detalles/${response.data.id.toString()}"><b>Ver registro</b></a>`)
      }).catch(function (error) {
        self.form.ser_cot = val_ant;
        self.submitted = false
        self.spinner = true
        self.errors = alert.responseCatch(error, 'Code #1009');
      });
    },
    async getSeries() {
      let self = this;
      self.series = await repo.getSeries(self)
      self.showForm = false
    }
  }
}
</script>
