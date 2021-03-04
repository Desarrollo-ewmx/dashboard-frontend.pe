<template>
<b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
  <CCard class="shadow">
    <CCardHeader color="info p-1">
      <ActModalTable :id_modelo="$route.params.id" />
      <h4>
        Editar registro:
        <CLink :to="{ name: 'Detalles Rol', params: { id: $route.params.id }}" v-if="permisos(['rol.show','rol.edit'])" v-text="$route.params.id" />
        <span v-else v-text="$route.params.id" />
      </h4>
    </CCardHeader>
    <CForm @submit.prevent="update()" method="POST">
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
            <CButton type="submit" color="primary" class="w-75" :disabled="!isValid || submitted" v-if="!submitted"><CIcon name="cilSave"/> Actualizar</CButton>
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
import alert from '@/repositories/global/alert'
import { validationMixin } from "vuelidate"
import { required, maxLength } from "vuelidate/lib/validators"
import check from '@/repositories/global/check'
import ActModalTable from '../actividad/ActModalTable'
import Swal from 'sweetalert2'

export default {
  name: 'RolEdit',
  components: {
    ActModalTable
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
    this.getRegistro()
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
      permis: { required },
      desc: { maxLength: maxLength(30000) },
    },
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    },
    getEmptyForm() {
      return {
        nom: '',
        permis: [],
        desc: ''
      }
    },
    checkIfValid(fieldName) {
      const field = this.$v.form[fieldName]
      if(!field.$dirty) {
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
        let self  = this;
        let data  = await repoRol.updateRegistro(self)
        if(data != undefined) {
          self.submitted  = false
          self.spinner    = false
          await alert.response200(3, '¡Actualizado exitosamente!', '')
        }
      }
    },
    async getRegistro() {
      let self          = this;
      self.form         = await repoRol.getRegistro(self);
      self.showForm     = false
    },
    async getPermisos() {
      let self      = this;
      self.grup_permisos = await repoPer.getAllPermisos(self)
      self.showForm = false
    },
  }
}
</script>
