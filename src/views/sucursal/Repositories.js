import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'

const showRegistro = (self, id) => {
  self.$router.push({path: `/sucursales/detalles/${id.toString()}`});
}
const editRegistro = (self, id) => {
  self.$router.push({path: `/sucursales/editar/${id.toString()}`});
}
const getRegistro = async (self) => {
	try {
    let resp = await axios.get(self.$apiAdress+'/api/admin/sucursal/detalles/'+self.$route.params.id+'?token='+localStorage.getItem("api_token"));
    
		return resp.data
	}catch(error) {
		alert.responseCatch(error, 'Code #1012')
	}
}
const getSeries = async (self) => {
	try {
    let resp = await axios.post(self.$apiAdress+'/api/admin/catalogo/getAll?token='+localStorage.getItem("api_token"), { input: 'Cotizaciones (Serie)' });
    
    let series = []
    resp.data.forEach(function(valor, indice, array) {
      series.push({
        value:  valor.value,
        text:   valor.text
      });
    });

		return series
	}catch(error) {
		alert.responseCatch(error, 'Code #1005')
	}
}

export default ({
  getRegistro,
  getSeries,
  showRegistro,
  editRegistro
});