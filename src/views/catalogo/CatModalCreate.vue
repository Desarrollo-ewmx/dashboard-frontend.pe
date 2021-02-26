<template>
<div>
  <CFormGroup wrapperClasses="input-group pt-2">
    <template #prepend-content><CIcon name="cilList"/></template>
    <template #append>
      <CButton color="secondary" @click="getSeries()" title="Recargar"><CIcon name="cilLoop"/></CButton>
      <CButton v-b-modal.CatModalCreate color="info" title="Agregar" class="p-2 m-0" v-if="permisos(['catalogo.create'])"><b-icon icon="plus-circle" class="h3 p-0 m-0"></b-icon></CButton>
    </template>
    <template #label>Serie *</template>
    <template #input>
      <multiselect
        @select="emitEvent"
        :options="series"
        :value="val_ser_cot"
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
 
  <b-modal id="CatModalCreate" title="REGISTRAR CATÁLOGO" content-class="shadow" body-class="p-0 m-0" header-bg-variant="info" header-class="p-2" hide-backdrop scrollable hide-footer>
    <CatCreateFields :opcion_alert="1" :val_input="val_input" @response="respCatCreateFields($event)" />
  </b-modal>
</div>
</template>

<script>
import repoCat from '../catalogo/Repositories'
import CatCreateFields from './CatCreateFields'
import check from '@/repositories/global/check'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'CatModalCreate',
  props: ['val_ser_cot'],
  components: {
    CatCreateFields,
    Multiselect
  },
  data() {
    return {
      series: [],
      val_input: {value: 'Cotizaciones (Serie)', text: 'Cotizaciones (Serie)'}
    }
  },
  mounted: function() {
    this.getSeries()
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    },
    emitEvent(opcion) {
      this.$emit('response', opcion)
    },
    respCatCreateFields(dataEvent) {
      if(dataEvent.input == 'Cotizaciones (Serie)')
        this.series.push({value: dataEvent.value, text: dataEvent.value})
    },
    async getSeries() {
      let self = this;
      self.series = await repoCat.getAllSeries(self, 'Cotizaciones (Serie)')
    },
  }
}
</script>
