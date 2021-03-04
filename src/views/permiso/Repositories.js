import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'

const urlAPI = '/api/admin/permiso';

const getPagination = async (self) => {
	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'?token='+localStorage.getItem("api_token")+'&page='+self.activePage, {
      sorter:       self.sorter,
      tableFilter:  self.tableFilter,
      columnFilter: self.columnFilter,
      itemsLimit:   self.itemsLimit,
      startDate:    self.startDate,
      endDate:      self.endDate
    })

		return response.data
	}catch(error) {
		alert.responseCatch(error, 'Code #1015')
	}
}
const getAllPermisos = async (self) => {
	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/getAll?token='+localStorage.getItem("api_token"));

    let permisos = []
    let num_contador_repetido = null
    response.data.forEach(function(valor1, indice1, array1) {
      if(permisos.length == 0) { // Checa si la variable permisos esta vacia
        permisos.push({ // Como la variable permisos esta vacia se da de alta el registro numero 1
          modulo: valor1.mod,
          permisos: [{
            value:  valor1.id,
            text:   valor1.nom+' ('+valor1.desc+')'
          }]
        });
      } else { // En caso de que la variable permisos ya no este vacia se daran de alta los demas registros
        let existe = 'no'

        permisos.forEach(function(valor2, indice2, array2) { // Se recorrera la variable permisos para saber si ya esta ddo de alta el permiso
          if(valor2.modulo == valor1.mod) { //Si el modulo ya existe en el nuevo array de permisos se indica que si existe y cual es la posuicion de ese registro
            existe = 'si'
            num_contador_repetido = indice2
          }
        });

        if(existe == 'no') { 
          permisos.push({ // Como la variable permisos esta vacia se da de alta el registro numero 1
            modulo: valor1.mod,
            permisos: [{
              value:  valor1.id,
              text:   valor1.nom+' ('+valor1.desc+')'
            }]
          });
        } else {
          permisos[num_contador_repetido].permisos.push({
            value:  valor1.id,
            text:   valor1.nom+' ('+valor1.desc+')'
          });
        }
      }
    });

		return permisos
	}catch(error) {
		alert.responseCatch(error, 'Code #1020')
	}
}

export default ({
  getPagination,
  getAllPermisos,
});