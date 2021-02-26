import "regenerator-runtime/runtime";
import axios from "axios";
import store from '@/store';
import alert from '@/repositories/global/alert'
import dash from '@/repositories/global/dashboard'

const permiso = (permiso) => {
  // Permiso global es para las rutas que no se necesita un permiso en especifico para acceder por ejemplo el tablero y todas las ventanas del perfil del usuario donde cualquiera puede acceder siempre y cuando este logeado
  if(permiso[0] == 'global')
  return true
    
  // Verifica si el usuario tiene el rol de desarrollador y permite el acceso a la ruta
  let roles = JSON.parse(localStorage.getItem("roless"))
  for(let i =0; i<roles.length; i++) {
    if(roles[i].name == 'desarrollador')
    return true
  }

  // Verifica si el usuario tiene los permisos autorizados por poder acceder a la ruta solicitada
  let perm = JSON.parse(localStorage.getItem("permisos"));
  for(let i =0; i<permiso.length; i++) {
    if(perm.includes(permiso[i]))
    return true
  }
  
  return false
}
const getUserAutenticado = async (to, next) => {
  try {
    if(localStorage.getItem("api_token") != null) { // Verifica si el token aun sigue siendo valido para actualizar la información del usuario
      // Si la ruta a la que se trata de acceder es la del login y la api_token aun es valida lo edirecciona a la pagina siguiente
      if(to.name == 'Login') {
        await next({ path: '/inicio' })
      }
      let resp = await axios.post(store.state.apiAdress+'/api/admin/autenticado?token=' + localStorage.getItem("api_token"));
      await dash.getDataStoreUser(resp.data, false)

      return true
    }
    await false
	}catch(error) {
		alert.responseCatch(error, 'Code #1001')
	}
}

export default ({
  permiso,
  getUserAutenticado
});