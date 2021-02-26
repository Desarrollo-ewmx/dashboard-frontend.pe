<template>
<CForm @submit.prevent="store()" method="POST">
  <CCardBody>
    <CRow v-if="errors != null" class="alert alert-danger p-0 m-0">
      <CCol sm="12"><ul><li class=" text-danger" v-for="error in errors">{{ error[0] }}</li></ul></CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
          <CFormGroup wrapperClasses="input-group pt-2">
            <template #prepend-content><CIcon name="cilList"/></template>
            <template #label>Input *</template>
            <template #input>
              <multiselect
                v-model="$v.form.input.$model"
                :options="inputs"
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
          <span class="text-danger float-right" v-if="!$v.form.input.required">Este es un campo obligatorio.</span>
        </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput label="Valor *" type="text" placeholder="Valor" maxlength="150" class="mb-0" :lazy="false" :value.sync="$v.form.valor.$model" :isValid="checkIfValid('valor')">
          <template #prepend-content><CIcon name="cilText"/></template>
        </CInput>
        <span class="text-danger float-right" v-if="!$v.form.valor.required">Este es un campo obligatorio.</span>
        <span class="text-danger float-right" v-if="!$v.form.valor.maxLength">Este campo no debe contener más de {{$v.form.valor.$params.maxLength.max }} caracteres.</span>
      </CCol>
    </CRow>
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
</template>

<script>
import axios from 'axios'
import alert from '@/repositories/global/alert'
import opcSelect from '@/repositories/opcionesSelect/catalogo'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { validationMixin } from "vuelidate"
import { required, maxLength } from "vuelidate/lib/validators"

export default {
  name: 'CatCreateFields',
  props: ['opcion_alert', 'val_input'],
  components: {
    Multiselect
  },
  data() {
    return {
      submitted: false,
      spinner: false,
      form: this.getEmptyForm(),
      errors: null,
      inputs: opcSelect.catalogo
    }
  },
  computed: {
    //formString() { return JSON.stringify(this.form, null, 4) },
    isValid() { return !this.$v.form.$invalid },
  },
  mixins: [validationMixin],
  validations: {
    form: {
      input: { required },
      valor: { required, maxLength: maxLength(150) }
    },
  },
  methods: {
    goBack() { this.$router.go(-1) },
    getEmptyForm() {
      return {
        input: this.val_input,
        valor: ''
      }
    },
    clearForm() {
      let self = this;
      self.form.input = ''
      self.form.valor = ''
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
      self.spinner    = true
      self.errors     = null
      let val_ant     = self.form.input
      self.form.input = self.form.input.value

      axios.post(this.$apiAdress+'/api/admin/catalogo/almacenar?token='+localStorage.getItem("api_token"), self.form
      ).then(function (response) {
        self.clearForm()
        self.submitted = false
        self.spinner = false
        self.$emit('response', response.data)
        alert.response200(self.opcion_alert, '¡Registrado exitosamente!', response.data.id)
      }).catch(function (error) {
        self.form.input = val_ant
        self.submitted = false
        self.spinner = false
        self.errors = alert.responseCatch(error, 'Code #1011');
      });
    },
  }
}
</script>
