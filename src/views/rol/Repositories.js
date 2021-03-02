import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'

const urlAPI = '/api/admin/rol';

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
const storeRegistro = async (self) => {
  self.submitted  = true
  self.spinner    = true
  self.errors     = null

  self.form.permis = []
  self.form.perm.forEach(function(valor, indice, array) {
    self.form.permis.push(
      valor.value
    );
  });

	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/almacenar?token='+localStorage.getItem("api_token"), self.form);

    return response.data
	}catch(error) {
    self.submitted  = false
    self.spinner    = false
		self.errors     = alert.responseCatch(error, 'Code #1016');
	}
}
const updateRegistro = async (self) => {
  self.submitted  = true
  self.spinner    = true
  self.errors     = null

	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/actualizar/'+self.$route.params.id+'?token='+localStorage.getItem("api_token"), self.form);
     
    return response.data
	}catch(error) {
    self.submitted  = false
    self.spinner    = false
    self.errors     = alert.responseCatch(error, 'Code #1017');
	}
}
const getRegistro = async (self) => {
	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/get/'+self.$route.params.id+'?token='+localStorage.getItem("api_token"));
    
		return response.data
	}catch(error) {
		alert.responseCatch(error, 'Code #1018')
	}
}
const deleteRegistro = async (self, id) => {
	try {
    let response = await axios.delete(self.$apiAdress+urlAPI+'/eliminar/'+id+'?token='+localStorage.getItem("api_token"));

		return response
	}catch(error) {
		alert.responseCatch(error, 'Code #1019')
	}
}
export default ({
  getPagination,
  storeRegistro,
  updateRegistro,
  getRegistro,
  deleteRegistro
});