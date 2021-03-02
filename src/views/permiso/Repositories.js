import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'

const urlAPI = '/api/admin/permiso';

const getAllPermisos = async (self) => {
	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/getAll?token='+localStorage.getItem("api_token"));

    let permisos = []
    response.data.forEach(function(valor, indice, array) {
        permisos.push({
        value:  valor.id,
        text:   valor.nom+' ('+valor.desc+')'
      });
    });

		return permisos
	}catch(error) {
		alert.responseCatch(error, 'Code #1020')
	}
}

export default ({
  getAllPermisos,
});