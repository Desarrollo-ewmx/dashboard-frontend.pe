import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'

const urlAPI = '/api/admin/queja-y-sugerencia';

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
		alert.responseCatch(error, 'Code #1021')
	}
}
const storeRegistro = async (self) => {
  self.submitted      = true
  self.spinner        = true
  self.errors         = null
  self.form.tipo      = self.form.tip.value
  self.form.deprto    = self.form.depto.value

	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/almacenar?token='+localStorage.getItem("api_token"), self.form);

    return response.data
	}catch(error) {
    self.submitted    = false
    self.spinner      = false
		self.errors       = alert.responseCatch(error, 'Code #1022');
	}
}
const getRegistro = async (self) => {
	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/get/'+self.$route.params.id+'?token='+localStorage.getItem("api_token"));
    
		return response.data
	}catch(error) {
		alert.responseCatch(error, 'Code #1012')
	}
}

export default ({
  getPagination,
  storeRegistro,
  getRegistro
});