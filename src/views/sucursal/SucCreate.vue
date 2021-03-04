<template>
<b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
  <CCard class="shadow">
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
            <CatModalCreate v-if="!showForm" @response="respCatModalCreate($event)" />
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
        <!--
        <CCol lg="6">
          <CCard :class="`bg-${submitted ? 'info' : 'secondary' }`">
            <pre>{{formString}}</pre>
          </CCard>
        </CCol>
        -->
      </CCardBody>
      <CCardFooter>
        <CRow class="content-center">
          <CCol>
            <b-spinner label="Loading..." variant="primary" v-if="spinner"></b-spinner>
            <CButton type="submit" color="primary" class="w-75" :disabled="!isValid || submitted" v-if="!submitted"><CIcon name="cilSave"/> Registrar</CButton>
          </CCol>
        </CRow>
      </CCardFooter>
    </CForm>
  </CCard>
</b-overlay>
</template>

<script>
import repoSuc from './Repositories'
import SucMenu from './SucMenu'
import CatModalCreate from '../catalogo/CatModalCreate'
import alert from '@/repositories/global/alert'
import { validationMixin } from "vuelidate"
import { required, maxLength } from "vuelidate/lib/validators"

export default {
  name: 'SucCreate',
  components: {
    SucMenu,
    CatModalCreate
  },
  data() {
    return {
      submitted: false,
      spinner: false,
      showForm: false,
      form: this.getEmptyForm(),
      errors: null,
    }
  },
  computed: {
    //formString() { return JSON.stringify(this.form, null, 4) },
    isValid() { return !this.$v.form.$invalid },
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
    getEmptyForm() {
      return {
        suc: '',
        direc: '',
        ser_cot: '',
      }
    },
    clearForm() {
      let self          = this;
      self.form.suc     = ''
      self.form.direc   = ''
      self.form.ser_cot = ''
    },
    checkIfValid(fieldName) {
      const field = this.$v.form[fieldName]
      if(!field.$dirty) {
        return null
      } 
      return !(field.$invalid || field.$model === '')
    },
    async store() {
      let self  = this;
      let data  = await repoSuc.storeRegistro(self)
      if(data != undefined) {
        self.showForm   = true
        self.clearForm()
        self.submitted  = false
        self.spinner    = false
        await alert.response200(2, '¡Registrado exitosamente!', data.id)
        self.showForm     = false
      }
    },
    respCatModalCreate(dataEvent) {
      this.form.ser_cot = dataEvent
    }
  }
}
</script>
