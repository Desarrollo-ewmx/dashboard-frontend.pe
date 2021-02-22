import axios from "axios";
import store from '@/store';

var dashboard = {
  dashboardUpdate(campo,valor) {
    let self = this;

    axios.post(store.state.apiAdress+'/api/admin/perfil/update-dashboard?token='+localStorage.getItem("api_token"), {
      campo:  campo,
      valor:  valor
    }).then(function (response) {
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      if(response.data.sucursal != null) {
        localStorage.setItem("sucursal", JSON.stringify(response.data.sucursal));
        location.reload()
      }
    }).catch(function (error) {
      self.responseCatch(error, 'Code #1007')
    });
  },
  getDataStoreUser(data, genToken) {
    let permi = []  
    data.permisos.forEach(function(valor, indice, array) {
      permi.push(valor.name);
    });

    let sucursales = []
    data.sucursales.forEach(function(valor, indice, array) {
      sucursales.push({
        value: valor.id,
        label: valor.suc
      });
    });

    if(genToken) { // Dependiendo la opcion se refresca o no el token
      localStorage.setItem("api_token", data.access_token);
    }
    
    localStorage.setItem("desarrollador", JSON.stringify(data.desarrollador));
    localStorage.setItem("sistema", JSON.stringify(data.sistema));
    localStorage.setItem("locale", data.usuario.lang);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    localStorage.setItem("roless", JSON.stringify(data.roless));
    localStorage.setItem('permisos', JSON.stringify(permi));
    localStorage.setItem('sucursal', JSON.stringify(data.sucursal));
    localStorage.setItem('sucursales', JSON.stringify(sucursales));
    localStorage.setItem('roles', data.roles); // Este se debe de eliminar
   
    store.state.i18n.locale     = data.usuario.lang
    store.state.sidebarShow     = data.usuario.sidebarShow
    store.state.sidebarMinimize = Boolean(data.usuario.sidebarMinimize)
    store.state.darkMode        = Boolean(data.usuario.darkMode)

    return true
  },
  sidebarShow() {
    if(JSON.parse(localStorage.getItem("usuario")) == null)
      return 'responsive'
    else
      return JSON.parse(localStorage.getItem("usuario")).sidebarShow
  },
  sidebarMinimize() {
    if(JSON.parse(localStorage.getItem("usuario")) == null)
      return false
    else
      return Boolean(JSON.parse(localStorage.getItem("usuario")).sidebarMinimize)
  },
  darkMode() {
    if(JSON.parse(localStorage.getItem("usuario")) == null)
      return false
    else
      return Boolean(JSON.parse(localStorage.getItem("usuario")).darkMode)
  },
}

export default dashboard