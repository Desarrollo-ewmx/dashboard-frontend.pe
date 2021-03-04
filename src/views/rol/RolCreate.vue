<template>
<b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
  <CCard class="shadow">
    <CCardHeader class="p-1">
      <RolMenu :actRC="true" />
    </CCardHeader>
    <CForm @submit.prevent="store()" method="POST">
      <CCardBody>
        <CRow v-if="errors != null" class="alert alert-danger p-0 m-0">
          <CCol sm="12"><ul><li class=" text-danger" v-for="error in errors">{{ error[0] }}</li></ul></CCol>
        </CRow>
        <CRow>
          <CCol sm="6">
            <CInput label="Rol *" type="text" placeholder="Rol" maxlength="80" class="mb-0" :lazy="false" :value.sync="$v.form.nom.$model" :isValid="checkIfValid('nom')">
              <template #prepend-content><CIcon name="cilText"/></template>
            </CInput>
            <span class="text-danger float-right" v-if="!$v.form.nom.required">Este es un campo obligatorio.</span>
            <span class="text-danger float-right" v-if="!$v.form.nom.maxLength">Este campo no debe contener más de {{$v.form.nom.$params.maxLength.max }} caracteres.</span>
          </CCol>
          <CCol sm="6">
            <CInput label="Slug *" type="text" placeholder="Slug" maxlength="40" class="mb-0" :lazy="false" :value.sync="$v.form.name.$model" :isValid="checkIfValid('name')">
              <template #prepend-content><CIcon name="cilText"/></template>
            </CInput>
            <span class="text-danger float-right" v-if="!$v.form.name.required">Este es un campo obligatorio.</span>
            <span class="text-danger float-right" v-if="!$v.form.name.maxLength">Este campo no debe contener más de {{$v.form.name.$params.maxLength.max }} caracteres.</span>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CTextarea label="Descripción" placeholder="Descripción"  maxlength="30000" vertical rows="9" class="mb-0" :lazy="false" :value.sync="$v.form.desc.$model" :isValid="checkIfValid('desc')">
              <template #prepend-content><CIcon name="cilText"/></template>
            </CTextarea>
            <span class="text-danger float-right" v-if="!$v.form.desc.maxLength">Este campo no debe contener más de {{$v.form.desc.$params.maxLength.max }} caracteres.</span>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <label>Permisos *</label>
            <perfect-scrollbar style="height:30em;width:100%;margin:0px 0px 1% 0px">
              <b-list-group><b-list-group-item v-for="grupo in grup_permisos">
                <b-form-group><strong><label v-text="'Módulo: '+grupo.modulo" /></strong>
                  <b-form-checkbox-group 
                    v-model="$v.form.permis.$model"
                    :options="grupo.permisos"
                    name="checkbox-2a"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-list-group-item></b-list-group>
            </perfect-scrollbar>
             <span class="text-danger float-right" v-if="!$v.form.permis.required">Seleccionar por lo menos una opción.</span>
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
import repoRol from './Repositories'
import repoPer from '../permiso/Repositories'
import RolMenu from './RolMenu'
import alert from '@/repositories/global/alert'
import { validationMixin } from "vuelidate"
import { required, maxLength } from "vuelidate/lib/validators"

export default {
  name: 'RolCreate',
  components: {
    RolMenu
  },
  data() {
    return {
      submitted: false,
      spinner: false,
      showForm: true,
      form: this.getEmptyForm(),
      errors: null,
      grup_permisos: [],
    }
  },
  mounted: function() {
    this.getPermisos();
  },
  computed: {
    //formString() { return JSON.stringify(this.form, null, 4) },
    isValid() { return !this.$v.form.$invalid },
  },
  mixins: [validationMixin],
  validations: {
    form: {
      nom: { required, maxLength: maxLength(80) },
      name: { required, maxLength: maxLength(40) },
      permis: { required },
      desc: { maxLength: maxLength(30000) },
    },
  },
  methods: {
    getEmptyForm() {
      return {
        nom: '',
        name: '',
        permis: [],
        desc: ''
      }
    },
    clearForm() {
      let self          = this;
      self.form.nom     = ''
      self.form.name    = ''
      self.form.permis  = []
      self.form.desc    = ''
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
      let data  = await repoRol.storeRegistro(self)
      if(data != undefined) {
        self.clearForm()
        self.submitted  = false
        self.spinner    = false
        await alert.response200(2, '¡Registrado exitosamente!', data.id)
      }
    },
    async getPermisos() {
      let self      = this;
      self.grup_permisos = await repoPer.getAllPermisos(self)
      self.showForm = false
    },
  }
}
</script>
