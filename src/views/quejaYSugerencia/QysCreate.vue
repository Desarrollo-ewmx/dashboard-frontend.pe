<template>
<b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
  <CCard class="shadow">
    <CCardHeader class="p-1">
      <QysMenu :actQC="true" />
    </CCardHeader>
    <CForm @submit.prevent="store()" method="POST">
      <CCardBody>
        <CRow v-if="errors != null" class="alert alert-danger p-0 m-0">
          <CCol sm="12"><ul><li class=" text-danger" v-for="error in errors">{{ error[0] }}</li></ul></CCol>
        </CRow>
        <CRow>
          <CCol sm="6">
            <CFormGroup wrapperClasses="input-group pt-2">
              <template #prepend-content><CIcon name="cilList"/></template>
              <template #label>Tipo *</template>
              <template #input>
                <multiselect
                  v-model="$v.form.tip.$model"
                  :options="tipos"
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
            <span class="text-danger float-right" v-if="!$v.form.tip.required">Este es un campo obligatorio.</span>
          </CCol>
          <CCol sm="6">
            <CFormGroup wrapperClasses="input-group pt-2">
              <template #prepend-content><CIcon name="cilList"/></template>
              <template #label>Departamento *</template>
              <template #input>
                <multiselect
                  v-model="$v.form.depto.$model"
                  :options="departamentos"
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
            <span class="text-danger float-right" v-if="!$v.form.depto.required">Este es un campo obligatorio.</span>
          </CCol>
        </CRow>
       <CRow>
          <CCol sm="12">
            <CTextarea label="Observaciones *" placeholder="Observaciones"  maxlength="30000" vertical rows="9" class="mb-0" :lazy="false" :value.sync="$v.form.obs.$model" :isValid="checkIfValid('obs')">
              <template #prepend-content><CIcon name="cilText"/></template>
            </CTextarea>
            <span class="text-danger float-right" v-if="!$v.form.obs.maxLength">Este campo no debe contener más de {{$v.form.obs.$params.maxLength.max }} caracteres.</span>
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
import repoQys from './Repositories'
import QysMenu from './QysMenu'
import opcSelect from '@/repositories/opcionesSelect/quejaYSugerencia'
import alert from '@/repositories/global/alert'
import { validationMixin } from "vuelidate"
import { required, maxLength } from "vuelidate/lib/validators"
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'QysCreate',
  components: {
    QysMenu,
    Multiselect
  },
  data() {
    return {
      submitted: false,
      spinner: false,
      showForm: false,
      form: this.getEmptyForm(),
      errors: null,
      departamentos: opcSelect.departamento,
      tipos: opcSelect.tipo
    }
  },
  computed: {
    //formString() { return JSON.stringify(this.form, null, 4) },
    isValid() { return !this.$v.form.$invalid },
  },
  mixins: [validationMixin],
  validations: {
    form: {
      tip: { required },
      depto: { required },
      obs: { required, maxLength: maxLength(30000) }
    },
  },
  methods: {
    getEmptyForm() {
      return {
        tip: '',
        depto: '',
        obs: '',
      }
    },
    clearForm() {
      let self          = this;
      self.form.tip     = ''
      self.form.depto   = ''
      self.form.obs = ''
    },
    checkIfValid(fieldName) {
      const field = this.$v.form[fieldName]
      if(!field.$dirty) {
        return null
      } 
      return !(field.$invalid || field.$model === '')
    },
    async store() {
      let suc_act_1 = await alert.checkSucursalActiva()
      
      if(suc_act_1) {
        let self  = this;
        let data  = await repoQys.storeRegistro(self)
        if(data != undefined) {
          self.clearForm()
          self.submitted  = false
          self.spinner    = false
          await alert.response200(2, '¡Registrado exitosamente!', data.id)
        }
      }
    },
  }
}
</script>
