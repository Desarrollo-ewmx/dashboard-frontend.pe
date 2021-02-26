<template>
<b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
  <CCard class="shadow">
    <CCardHeader color="info p-1">
      <ActModalTable :id_modelo="$route.params.id" />
      <h4>
        Editar registro:
        <CLink :to="{ name: 'Detalles Sucursal', params: { id: $route.params.id }}" v-if="permisos(['sucursal.show','sucursal.edit'])" v-text="$route.params.id" />
        <span v-else v-text="$route.params.id" />
      </h4>
    </CCardHeader>
    <CForm @submit.prevent="update()" method="POST">
      <CCardBody>
        <CRow v-if="errors != null" class="alert alert-danger p-0 m-0">
          <CCol sm="12"><ul><li class=" text-danger" v-for="error in errors">{{ error[0] }}</li></ul></CCol>
        </CRow>
        <CRow>
          <CCol sm="3">
            <GloModalCreateOneImagen :urlAPI="'sucursales/'+$route.params.id" :rut_arc="form.log_rut" :nom_arc="form.log_nom" @response="respGloModalCreateOneImagen($event)"/>
          </CCol>
          <CCol sm="9">
            <CRow>
              <CCol sm="6">
                <CInput label="Sucursal *" type="text" placeholder="Sucursal" maxlength="50" class="mb-0" :lazy="false" :value.sync="$v.form.suc.$model" :isValid="checkIfValid('suc')">
                  <template #prepend-content><CIcon name="cilText"/></template>
                </CInput>
                <span class="text-danger float-right" v-if="!$v.form.suc.required">Este es un campo obligatorio.</span>
                <span class="text-danger float-right" v-if="!$v.form.suc.maxLength">Este campo no debe contener más de {{$v.form.suc.$params.maxLength.max }} caracteres.</span>
              </CCol>
              <CCol sm="6">
                <CatModalCreate v-if="!showForm" :val_ser_cot="form.ser_cot" @response="respCatModalCreate($event)" />
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
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter>
        <CRow class="content-center">
          <CCol>
            <b-spinner label="Loading..." variant="primary" v-if="spinner"></b-spinner>
            <CButton type="submit" color="primary" class="w-75" :disabled="!isValid || submitted" v-if="!submitted"><CIcon name="cilSave"/> Actualizar</CButton>
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
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { validationMixin } from "vuelidate"
import { required, maxLength } from "vuelidate/lib/validators"
import check from '@/repositories/global/check'
import GloModalCreateOneImagen from '../global/GloModalCreateOneImagen'
import ActModalTable from '../actividad/ActModalTable'
import Swal from 'sweetalert2'

export default {
  name: 'SucEdit',
  components: {
    SucMenu,
    CatModalCreate,
    Multiselect,
    GloModalCreateOneImagen,
    ActModalTable
  },
  data() {
    return {
      submitted: false,
      spinner: false,
      showForm: true,
      form: this.getEmptyForm(),
      errors: null,
    }
  },
  mounted: function() {
    this.getRegistro()
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
    permisos(permisos) {
      return check.permiso(permisos)
    },
    getEmptyForm() {
      return {
        suc: '',
        direc: '',
        ser_cot: '',
      }
    },
    checkIfValid(fieldName) {
      const field = this.$v.form[fieldName]
      if (!field.$dirty) {
        return null
      } 
      return !(field.$invalid || field.$model === '')
    },
    async update() {
      let result = await Swal.fire({
        icon: 'info',
        title: '¿Estás seguro que quieres actualizar este registro?',
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: `Cancelar`,
      })

      if(result.value) {
        let self          = this;
        self.form.val_ant = self.form.ser_cot
        let data          = await repoSuc.updateRegistro(self)
        if(data != undefined) {
          self.form.ser_cot = self.form.val_ant;
          self.submitted    = false
          self.spinner      = false
          await alert.response200(3, '¡Actualizado exitosamente!', '')
        }
      }
    },
    async getRegistro() {
      let self          = this;
      self.form         = await repoSuc.getRegistro(self);
      self.showForm     = false
      self.form.ser_cot = {value: self.form.ser_cot, text: self.form.ser_cot}
    },
    respGloModalCreateOneImagen(dataEvent) {
      let self          = this;
      self.form.log_rut = dataEvent.ruta;
      self.form.log_nom = dataEvent.nombre
    },
    respCatModalCreate(dataEvent) {
      this.form.ser_cot = dataEvent
    }
  }
}
</script>
