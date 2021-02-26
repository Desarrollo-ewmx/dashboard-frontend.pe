import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'

const getAllSeries = async (self, input) => {
	try {
    let resp = await axios.post(self.$apiAdress+'/api/admin/catalogo/getAll?token='+localStorage.getItem("api_token"), { input: input });
    
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
  getAllSeries,
});