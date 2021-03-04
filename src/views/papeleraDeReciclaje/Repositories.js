import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'

const urlAPI = '/api/admin/papelera';

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
		alert.responseCatch(error, 'Code #1006')
	}
}
const restoreRegistro = async (self, id) => {
	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/restaurar/'+id+'?token='+localStorage.getItem("api_token"));
    
		return response.data
	}catch(error) {
		alert.responseCatch(error, 'Code #1012')
	}
}
const deleteRegistro = async (self, id) => {
	try {
    let response = await axios.delete(self.$apiAdress+urlAPI+'/eliminar/'+id+'?token='+localStorage.getItem("api_token"));

		return response
	}catch(error) {
		alert.responseCatch(error, 'Code #1004')
	}
}
export default ({
  getPagination,
  restoreRegistro,
  deleteRegistro
});