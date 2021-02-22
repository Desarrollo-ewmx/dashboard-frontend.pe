<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="w-100 justify-content-center">
      <CCol md="6">
        <div class="w-100">
        <div class="clearfix">
          <h1 class="float-left display-3 mr-4">104</h1>
          <h4 class="pt-3">Oops! You're lost.</h4>
          <p class="text-muted">Navegador no permitido, se recomienda usar Google Chrome o Mozilla para una mejor experiencia al navegar.</p>
        </div>
        <CInput
          class="mb-3"
          placeholder="What are you looking for?"
        >
          <template #prepend-content><CIcon name="cil-magnifying-glass"/></template>
          <template #append>
            <CButton color="info">Search</CButton>
          </template>
        </CInput>
      </div>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
  name: 'Page104'
}
</script>
