
import Vue from 'vue'
import Router from 'vue-router'
import check from '@/repositories/global/check'
import configRoutes from './configRoutes'

Vue.use(Router)

let router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  mode: 'history', // Quita el "#" de las rutas URL
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes() // En esta seccion se importan todas las rutas
})

router.beforeEach((to, from, next) => {
  check.getUserAutenticado(to, next)
    document.title = to.meta.title; // Vuelve dinamico el title de la pagina, este valor se define en la meta de cada ruta

    let roles = localStorage.getItem("roles");
    if(roles != null){
      roles = roles.split(',')
    }

    if(to.matched.some(record => record.meta.requiresAdmin)) { // Verifica si la ruta a la que se quiere acceder pide acceso de administrador
      if(roles != null && roles.indexOf('admin') >= 0 ){
        if(check.permiso(to.meta.permissions)) { // Verifica si el usuario cuenta con los permisos necesarios para acceder a la ruta que decea
          next()
        } else {
          next({ path: '/403', params: { nextUrl: to.fullPath } }) 
        }
      }else{
        next({ path: '/login', params: { nextUrl: to.fullPath } })
      }
    }else{
      next() // Si la ruta solicitada no esta protegida por administrador deja avanzar
    }
  
})

export default router
