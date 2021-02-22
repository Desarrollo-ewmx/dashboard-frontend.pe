<template>
<div>
  <CRow>
    <CCol sm="6" v-if="nom_arc != null">
      <b-spinner label="Loading..." variant="primary" :hidden="spinner"></b-spinner>
      <CButton color="danger" title="Recargar" class="mr-4 w-100" @click="deleteArchivo()" :hidden="!spinner"><CIcon name="cilTrash"/> Quitar</CButton>
    </CCol>
    <CCol sm="6">
      <CButton v-b-modal.GloModalCreateOneImagen color="info" title="Agregar" class="p-2 m-0 w-100"><b-icon icon="plus-circle" class="h5 p-0 m-0" /> Cargar</CButton>
    </CCol>
  </CRow>

  <b-modal id="GloModalCreateOneImagen" title="CARGAR ARCHIVO" content-class="shadow" body-class="p-0 m-0" size="sm" header-bg-variant="info" header-class="p-2" hide-backdrop scrollable hide-footer>
    <CRow>
      <CCol sm="12">
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options='dropzoneOptions' @vdropzone-success="dataArchivo" @vdropzone-error="errorServidor"/>
      </CCol>
    </CRow>
  </b-modal>
</div>
</template>

<script>
import axios from 'axios'
import alert from '@/repositories/global/alert'
import Swal from 'sweetalert2'
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'GloModalCreateOneImagen',
  props: ['url', 'nom_arc'],
  components: {
    vueDropzone
  },
  data() {
    return {
      spinner: true,
      dropzoneOptions: {
        url: this.$apiAdress+'/api/admin/imagen/one/almacenar/'+this.url,
        thumbnailWidth: 150,
        maxFilesize: 1,
        headers: { Authorization: `Bearer ${localStorage.getItem("api_token")}` },
        addRemoveLinks: true,
        parallelUploads: 2,
        acceptedFiles: "image/*",
        maxFiles: 1,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>Arrastra o da clic para cargar un archivo, Máximo 1MB por archivo.",
        dictFallbackMessage: "Su navegador no admite la carga de archivos mediante la función de arrastrar y soltar.",
        dictFallbackText: "Utilice el formulario de respaldo a continuación para cargar sus archivos como en los viejos tiempos.",
        dictFileTooBig: "El archivo es demasiado grande ({{filesize}}MB). Tamaño máximo de archivo permitido: {{maxFilesize}}MB.",
        dictInvalidFileType: "No puedes subir archivos de este tipo.",
        dictResponseError: "El servidor respondió con el código {{statusCode}}.",
        dictCancelUpload: "Cancelar carga",
        dictCancelUploadConfirmation: "¿Estás seguro de que deseas cancelar esta carga?",
        dictRemoveFile: "Remover archivo",
        dictMaxFilesExceeded: "No puedes subir más archivos."
      },
    }
  },
  methods: {
    dataArchivo(file, response) {
      this.$emit('sucursalEvent', [response,'almacenar'])
    },
    errorServidor(archivo, mensaje, xhr){
      console.log(mensaje)
    },
    deleteArchivo() {
      Swal.fire({
        icon: 'info',
        title: '¿Estás seguro que quieres eliminar este archivo?',
        html: 'Eliminaras permanentemente este archivo.',
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#CB3234',
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if(result.isConfirmed) {
          let self      = this;
          self.spinner  = false
          axios.post(self.$apiAdress+'/api/admin/imagen/eliminar/'+self.url+'?token='+localStorage.getItem("api_token"), {
            _method: 'DELETE'
          }).then(function (response) {
            self.spinner = true
            self.$emit('sucursalEvent', [response,'eliminar'])
          }).catch(function (error) {
            self.spinner = true
            alert.responseCatch(error, 'Code #1013');
          });
        }
      })
    },
  }
}
</script>
