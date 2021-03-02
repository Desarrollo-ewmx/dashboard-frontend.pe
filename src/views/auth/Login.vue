<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow>
      <CCol>
        <b-overlay :show="!showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
          <CCardGroup>
            <CCard>
              <CForm @submit.prevent="login" method="POST">
                <CCardBody>
                  <ul v-if="errors != null"><li class="text-danger" v-for="error in errors">{{ error[0] }}</li></ul>
                  <CRow>
                    <CCol sm="12">
                      <CInput label="Correo electronico *" type="email" placeholder="Correo electronico" maxlength="75" class="mb-0" autocomplete="username email" :lazy="false" :value.sync="$v.form.email.$model" :isValid="checkIfValid('email')">
                        <template #prepend-content><CIcon name="cil-envelope-open"/></template>
                      </CInput>
                      <span class="text-danger float-right" v-if="!$v.form.email.required">Este es un campo obligatorio.</span>
                      <span class="text-danger float-right" v-if="!$v.form.email.email">Este campo debe ser una dirección de correo electrónico válida.</span>
                    </CCol>
                    <CCol sm="12">
                      <label>Contraseña *</label>
                      <CInput type="password" placeholder="*******************" autocomplete="curent-password" maxlength="120" class="mb-0" :lazy="false" :value.sync="$v.form.password.$model" :isValid="checkIfValid('password')">
                        <template #prepend-content><CIcon name="cil-shield-alt"/></template>
                      </CInput>
                      <span class="text-danger float-right" v-if="!$v.form.password.required">Este es un campo obligatorio.</span>
                    </CCol> 
                  </CRow>
                  <CRow class="pb-3 pt-3">
                    <CCol sm="6">
                      <CInputCheckbox label="Recuérdame" class="mb-4" :checked.sync="$v.form.check_recuerdame.$model" :isValid="checkIfValid('check_recuerdame')" custom />
                    </CCol>
                    <CCol sm="6" class="text-right">
                      <b-link to="/password-restablecer">¿Olvidaste tu contraseña?</b-link>
                    </CCol> 
                  </CRow>
                  <CRow class="content-center">
                    <CCol sm="12">
                      <b-spinner label="Loading..." variant="primary" v-if="spinner"></b-spinner>
                      <CButton type="submit" color="primary" class="w-100" :disabled="!isValid || submitted" v-if="!submitted"><CIcon name="cilArrowThickFromLeft"/> Acceder</CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CForm>
            </CCard>
            <CCard color="dark" text-color="white" class="text-center py-5 d-md-down-none" v-if="showForm">
              <img :src="sistema.img_login_rut+sistema.img_login_nom" fluid alt="Imagen"/>
            </CCard>
          </CCardGroup>
        </b-overlay>
      </CCol>
    </CRow>
    <div class="fixed-bottom" v-if="showForm"> 
      <TheFooter :sistema="sistema" :desarrollador="desarrollador"/>
    </div>
  </CContainer>
</template>

<script>
import axios from "axios";
import alert from '@/repositories/global/alert'
import dash from '@/repositories/global/dashboard'
import sis from '@/repositories/global/sistema'
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"
import TheFooter from '@/containers/TheFooter'

export default {
  name: 'Login',
  components: {
    TheFooter
  },
  data() {
    return {
      submitted: false,
      spinner: false,
      showForm: false,
      form: this.getEmptyForm(),
      errors: [],
      sistema: [],
      desarrollador: []
    }
  },
  mounted() {
    this.getInfo()
  },
  computed: {
    //formString() { return JSON.stringify(this.form, null, 4) },
    isValid() { return !this.$v.form.$invalid },
  },
  mixins: [validationMixin],
  validations: {
    form: {
      email: { required, email },
      password: { required },
      check_recuerdame: { },
    }
  },
  methods: {
    getEmptyForm () {
      return {
        email: '',
        password: '',
        check_recuerdame: false,
      }
    },
    checkIfValid (fieldName) {
      const field = this.$v.form[fieldName]
      if(!field.$dirty) {
        return null
      } 
      return !(field.$invalid || field.$model === '')
    },
    login() {
      let self = this;
      self.submitted = true
      self.spinner = true
      self.errors = []
        
      axios.post(this.$apiAdress+'/api/login', self.form)
      .then(function (response) {
        dash.getDataStoreUser(response.data, true)
        self.$router.push({ path: 'inicio' });
      })
      .catch(function (error) {
        self.submitted  = false
        self.spinner    = false
        self.errors     = alert.responseCatch(error, 'Code #1003')
      });
    },
    async getInfo() {
      let self            = this;
      let data            = await sis.getInfo(this.$apiAdress);
      self.sistema        = data.sistema
      self.desarrollador  = data.desarrollador
      self.showForm       = true
    }
  }
}
</script>
