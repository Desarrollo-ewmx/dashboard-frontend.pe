import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'

const getInfo = async (apiAdress) => {
	try {
		let response = await axios.post(apiAdress+'/api/sistema/default');
		localStorage.setItem("sistema", JSON.stringify(response.data.sistema));
		localStorage.setItem("desarrollador", JSON.stringify(response.data.desarrollador));

		return response.data
	}catch(error) {
		alert.responseCatch(error, 'Code #1010')
	}
}

export default ({
  getInfo
});