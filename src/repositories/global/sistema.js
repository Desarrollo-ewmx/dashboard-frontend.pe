import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'

const getInfo = async (apiAdress) => {
	try {
		let resp = await axios.get(apiAdress+'/api/admin/sistema/default');
		localStorage.setItem("sistema", JSON.stringify(resp.data.sistema));
		localStorage.setItem("desarrollador", JSON.stringify(resp.data.desarrollador));

		return resp.data
	}catch(error) {
		alert.responseCatch(error, 'Code #1010')
	}
}

export default ({
  getInfo
});