<template>
<div>
  <CButton v-b-modal.ActModalTable color="secondary" title="Agregar" class="p-1 float-right" v-if="permisos(['actividad.show','actividad.fullShow'])"><CIcon name="cilList"/> Ver registro de actividad</CButton>

  <b-modal id="ActModalTable" title="REGISTRO DE ACTIVIDAD" content-class="shadow" body-class="p-0 m-0" size="xl" header-bg-variant="info" header-class="p-2" hide-backdrop scrollable hide-footer>
    <ActTable :id_modelo="id_modelo"/>
  </b-modal>
</div>
</template>

<script>
import ActTable from '../actividad/ActTable'
import check from '@/repositories/global/check'

export default {
  name: 'ActModalTable',
  props: ['id_modelo'],
  components: {
    ActTable
  },
  methods: {
    permisos(permisos) {
      return check.permiso(permisos)
    }
  }
}
</script>
