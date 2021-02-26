<template>
  <div class="c-app" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <TheSidebar :locale="locale"/>
    <TheAside/>
    <CWrapper>
      <TheHeader v-on:change-locale="changeLocale"/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <vue-page-transition name="fade-in-down">
              <router-view></router-view>
            </vue-page-transition>
          </CContainer>
        </main>
        <TheFooter :sistema="sistema" :desarrollador="desarrollador" />
      </div>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
import TheAside from './TheAside'

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    TheAside
  },
  data(){
    return {
      locale: 'es',
      sistema: JSON.parse(localStorage.getItem('sistema')),
      desarrollador: JSON.parse(localStorage.getItem('desarrollador'))
    }
  },
  methods: {
    changeLocale(value){
      this.locale = value;
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
