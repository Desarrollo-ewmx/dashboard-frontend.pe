import route from '@/router/index'
import Swal from 'sweetalert2'

const responseCatch = (error, code) => {
  let errors = []
  if(error.response === undefined) {
    Swal.fire({icon: 'info',title: 'status undefined',footer: code});
    localStorage.clear();
    route.push({ path: '/login' });
  }

  switch(error.response.status) {
    case 309: // Navegador no adminito
      route.push({ path: '/pages/104' });
      break;
    case 401: // Error de token
      Swal.fire({icon: 'info',title: error.response.data.message,footer: code});
      localStorage.clear();
      route.push({ path: '/login' });
      break;
    case 403: // Error de
      Swal.fire({icon: 'error',title: error.message,text: error.response.data.message,footer: code});
      break;
    case 404: // Registro no encontrado
      route.push({ path: '/pages/404' });
      break;
    case 405: // Error de URL o ruta invalida
      Swal.fire({icon: 'error',title: error.message,text: error.response.data.message,footer: code});
      break;
    case 422: // Error de validación
      errors = error.response.data.errors;
      break;
    case 512: // Sin acceso al sistema
      localStorage.clear();
      Swal.fire({icon: 'info',title: 'Acceso al sistema no permitido',footer: code});
      route.push({ path: '/login' });
      break;
    default:
      Swal.fire({icon: 'error',title: error.message,text: error.response.data.message,footer: 'Ocurrió un error favor de comunicarse con soporte. ('+code+')'});
      break;
  }
  
  return errors
}
const response200 = (opcion, titulo, id) => {
  let toast = null
  let html = ''
  switch(opcion) {
    case 1: // Opcion para registros nuevos (Swal pequeño y sin el mensaje de ver registro)
      toast = true
      break;
    case 2: // Opcion para registros nuevos (Swal grande y con el mensaje de ver registro)
      toast = false
      html  = `<a href="detalles/${id.toString()}" target="_blank"><b>Ver registro</b></a>`
      break;
    case 3: // Opción para registros actualizados (Swal grande y sin el mensaje de ver registro)
      toast = false
      break;
  }

  Swal.fire({
    toast: toast, // Opcion para hacer la ventana mas pequeña o grande
    position: 'top-end',
    icon: 'success',
    title: titulo,
    html: html,
    showConfirmButton: false,
    showCloseButton: true,
    timerProgressBar: true,
    timer: 50000
  })
}
const checkSucursalActiva = () => {
  let suc_act = JSON.parse(localStorage.getItem("sucursal"))

  if(suc_act.id == 1) {
    Swal.fire({
      toast: false, // Opcion para hacer la ventana mas pequeña o grande
      position: 'top-end',
      icon: 'info',
      title: 'Debe seleccionar una sucursal.',
      html: '',
      showConfirmButton: false,
      showCloseButton: true,
      timerProgressBar: true,
      timer: 50000
    })
    return false;
  }
  return true;
}
export default ({
  responseCatch,
  response200,
  checkSucursalActiva
});