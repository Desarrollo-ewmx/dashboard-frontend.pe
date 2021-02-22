<template>
<b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
  <CRow :key="form.log_nom">
    <CCol sm="12">
      <CCard>
        <CCardHeader color="info p-1">
          <ActModalTable :id_modelo="this.form.id" />
          <h4>
            Editar registro id:
            <CLink v-if="!permisos(['sucursal.show'])" @click="showRegistro($route.params.id)" v-text="$route.params.id" />
            <span v-else v-text="$route.params.id" />
          </h4>
        </CCardHeader>
        <CForm @submit.prevent="store()" method="POST">
          <CCardBody>
            <CRow v-if="errors != null" class="alert alert-danger p-0 m-0">
              <CCol sm="12"><ul><li class=" text-danger" v-for="error in errors">{{ error[0] }}</li></ul></CCol>
            </CRow>
            <CRow>
              <CCol sm="3">
                <b-card v-if="form.log_nom != null" :img-src="form.log_rut+form.log_nom" style="max-width:20rem;" class="p-0 m-0" img-alt="Image" img-top no-body>
                  <template #header>
                    <GloModalCreateOneImagen :url="ruta_modal_imagen" :nom_arc="form.log_nom" @sucursalEvent="sucursalEvent($event)"/>
                  </template>
                </b-card>
                <b-card v-else :img-src="sistema.def_img_rut+sistema.def_img_nom" style="max-width:20rem;" class="p-0 m-0" img-alt="Image" img-top no-body>
                  <template #header>
                    <GloModalCreateOneImagen :url="ruta_modal_imagen" @sucursalEvent="sucursalEvent($event)"/>
                  </template>
                </b-card>
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
                    <CFormGroup wrapperClasses="input-group pt-2">
                      <template #prepend-content><CIcon name="cilList"/></template>
                      <template #append><CButton color="secondary" @click="getSeries()" title="Recargar"><CIcon name="cilLoop"/></CButton><CatModalCreate/></template>
                      <template #label>Serie *</template>
                      <template #input>
                        <multiselect
                          v-model="$v.form.ser_cot.$model"
                          :options="series"
                          :value="form.ser_cot"
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
                <CButton type="submit" color="primary" class="w-100" :disabled="!isValid || submitted" :hidden="submitted"><CIcon name="cilSave"/> Actualizar</CButton>
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
import alert from '@/repositories/global/alert'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { validationMixin } from "vuelidate"
import { required, maxLength } from "vuelidate/lib/validators"
import SucMenu from './SucMenu'
import CatModalCreate from '../configuracion/catalogo/CatModalCreate'
import repo from './Repositories'
import check from '@/repositories/global/check'
import GloModalCreateOneImagen from '../global/GloModalCreateOneImagen'
import ActModalTable from '../actividad/ActModalTable'

export default {
  name: 'SucEdit',
  components: {
    SucMenu,
    Multiselect,
    CatModalCreate,
    GloModalCreateOneImagen,
    ActModalTable
  },
  data() {
    return {
      submitted: false,
      spinner: true,
      showForm: true,
      form: this.getEmptyForm(),
      errors: null,
      series: [],
      ruta_modal_imagen: 'sucursales/'+this.$route.params.id,
      sistema: JSON.parse(localStorage.getItem("sistema")),
    }
  },
  mounted: function() {
    this.getRegistro()
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
    permisos(permisos) {
      return !check.permiso(permisos)
    },
    showRegistro(id) {
      repo.showRegistro(this,id)
    },
    getEmptyForm() {
      return {
        suc: '',
        direc: '',
        ser_cot: '',
      }
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

      axios.put(this.$apiAdress+'/api/admin/sucursal/actualizar/'+self.$route.params.id+'?token='+localStorage.getItem("api_token"), self.form
      ).then(function (response) {
        self.form.ser_cot = val_ant;
        self.submitted = false
        self.spinner = true
        alert.response200(2, '¡Actualizado exitosamente!','')
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
    },
    async getRegistro() {
      let self = this;
      self.form = await repo.getRegistro(self);
      self.showForm = false
      self.form.ser_cot = {value: self.form.ser_cot, text: self.form.ser_cot}
    },
    sucursalEvent(dataEvent) {
      let self = this;
      let mensaje = null
      self.form = dataEvent[0]
      self.form.ser_cot = {value: self.form.ser_cot, text: self.form.ser_cot}
      if(dataEvent[1] == 'almacenar') { mensaje = '¡Archivo guardado exitosamente!' }
      else if(dataEvent[1] == 'eliminar') { mensaje = '¡Archivo eliminado exitosamente!' }
      alert.response200(1, mensaje,'')
    }
  }
}
</script>
