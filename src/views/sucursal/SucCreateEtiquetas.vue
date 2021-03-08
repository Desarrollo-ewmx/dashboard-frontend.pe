<template>
<div>
  <CRow>
    <CCol sm="3">
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
    <CCol sm="3">
      <CInput label="Valor *" type="text" placeholder="Valor" maxlength="150" class="mb-0" :lazy="false" :value.sync="$v.form.value.$model" :isValid="checkIfValid('value')">
        <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
      <span class="text-danger float-right" v-if="!$v.form.value.required">Este es un campo obligatorio.</span>
      <span class="text-danger float-right" v-if="!$v.form.value.maxLength">Este campo no debe contener más de {{$v.form.value.$params.maxLength.max }} caracteres.</span>
    </CCol>
    <CCol sm="2">
      <CInput label="Texto" type="text" placeholder="Texto" maxlength="150" class="mb-0" :lazy="false" :value.sync="$v.form.text.$model" :isValid="checkIfValid('text')">
        <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
      <span class="text-danger float-right" v-if="!$v.form.text.maxLength">Este campo no debe contener más de {{$v.form.text.$params.maxLength.max }} caracteres.</span>
    </CCol>
    <CCol sm="3">
      <CInput label="URL" type="text" placeholder="URL" maxlength="150" class="mb-0" :lazy="false" :value.sync="$v.form.url.$model" :isValid="checkIfValid('url')">
        <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
      <span class="text-danger float-right" v-if="!$v.form.url.maxLength">Este campo no debe contener más de {{$v.form.url.$params.maxLength.max }} caracteres.</span>
    </CCol>
    <CCol sm="1">
      <CButton type="button" color="primary" :disabled="!isValid || submitted" @click="addEtiqueta()"><CIcon name="cilSave"/></CButton>
    </CCol>
  </CRow>


  <fieldset disabled>
    <CRow v-for="etiqueta in etiquetas">
      <CCol sm="3">
        <CInput label="Tipo" type="text" placeholder="Tipo" v-model="etiqueta.tip">
          <template #prepend-content><CIcon name="cilText"/></template>
        </CInput>
      </CCol>
      <CCol sm="3">
        <CInput label="Valor" type="text" placeholder="Valor" v-model="etiqueta.value">
          <template #prepend-content><CIcon name="cilText"/></template>
        </CInput>
      </CCol>
      <CCol sm="3">
        <CInput label="Texto" type="text" placeholder="Texto" v-model="etiqueta.text">
          <template #prepend-content><CIcon name="cilText"/></template>
        </CInput>
      </CCol>
       <CInput label="URL" type="text" placeholder="URL" v-model="etiqueta.url">
          <template #prepend-content><CIcon name="cilText"/></template>
        </CInput>
      </CCol>
    </CRow>
  </fieldset>
  
</div>
</template>

<script>

import opcSelect from '@/repositories/opcionesSelect/sucursal'
import { validationMixin } from "vuelidate"
import { required, maxLength } from "vuelidate/lib/validators"
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'SucCreateEtiquetas',
  components: {
    Multiselect
  },
  data() {
    return {
      submitted: false,
      form: this.getEmptyForm(),
      tipos: opcSelect.tipo,
      etiquetas: []
    }
  },
  computed: {
    isValid() { return !this.$v.form.$invalid },
  },
  mixins: [validationMixin],
  validations: {
    form: {
      tip: { required },
      value: { required, maxLength: maxLength(150) },
      url: { required, maxLength: maxLength(150) },
      text: { required, maxLength: maxLength(150) }
    },
  },
  methods: {
    getEmptyForm() {
      return {
        tip: '',
        value: '',
        text: '',
        url: ''
      }
    },
    clearForm() {
      let self        = this;
      self.form.tip   = ''
      self.form.value = ''
      self.form.text  = ''
      self.form.url   = ''
    },
    checkIfValid(fieldName) {
      const field = this.$v.form[fieldName]
      if(!field.$dirty) {
        return null
      } 
      return !(field.$invalid || field.$model === '')
    },
    addEtiqueta() {
      let self  = this;
      self.etiquetas.push({
        tip:    self.form.tip.value,
        value:  self.form.value,
        text:  self.form.text,
        url:  self.form.url
      })
      self.clearForm()
      self.$emit('response', self.etiquetas)
    }
  }
}
</script>
