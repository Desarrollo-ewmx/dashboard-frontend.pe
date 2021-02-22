import route from '@/router/index'
import Swal from 'sweetalert2'

var alert = {
  responseCatch(error, code) {
    let errors = []
    if(error.response === undefined)
      Swal.fire({icon: 'info',title: 'status undefined',footer: code});

    switch(error.response.status) {
      case 422: // Error de validación
        errors = error.response.data.errors;
        break;
      case 401: // Error de token
        //Swal.fire({icon: 'info',title: 'Su sesión a terminado',footer: code});
        Swal.fire({icon: 'info',title: error.response.data.message,footer: code});
        localStorage.clear();
        route.push({ path: '/login' });
        break;
      case 403: // Error de
        Swal.fire({icon: 'error',title: error.message,text: error.response.data.message,footer: code});
        break;
      case 405: // Error de URL o ruta invalida
        Swal.fire({icon: 'error',title: error.message,text: error.response.data.message,footer: code});
        break;
      case 404: // Registro no encontrado
        route.push({ path: '/pages/404' });
        break;
      case 309: // Navegador no adminito
       route.push({ path: '/pages/104' });
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
  },
  response200(opcion, titulo, mensaje) {
    switch(opcion) {
      case 1: // Opcion
        Swal.fire({
          toast: true, // Opcion para hacer la ventana mas pequeña o grande
          //background: '#77DD77',
          position: 'top-end',
          icon: 'success',
          title: titulo,
          showConfirmButton: false,
          showCloseButton: true,
          timerProgressBar: true,
          timer: 50000
        })
      break;
      case 2: // Opción para registros actualizados
        Swal.fire({
          toast: false, // Opcion para hacer la ventana mas pequeña o grande
          //background: '#77DD77',
          position: 'top-end',
          icon: 'success',
          title: titulo,
          html: mensaje,
          showConfirmButton: false,
          showCloseButton: true,
          timerProgressBar: true,
          timer: 50000
      })
      break;
      default: // Opción por default para registros nuevos
        Swal.fire({
          toast: false, // Opcion para hacer la ventana mas pequeña o grande
          //background: '#77DD77',
          position: 'top-end',
          icon: 'success',
          title: titulo,
          html: mensaje,
          showConfirmButton: false,
          showCloseButton: true,
          timerProgressBar: true,
          timer: 50000
        })
        
      break;
    }
    
  },
}

export default alert