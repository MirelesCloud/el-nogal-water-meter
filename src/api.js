import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000'
})

export const insertMeter = payload => api.post(`/well/meter`, payload)
export const getAllMeters = () => api.get(`/well/meters`)
export const updateMeterById = (id, payload) => api.put(`/well/meter/${id}`, payload)
export const deleteMeterById = id =>  api.delete(`/well/meter/${id}`)
export const getMeterById = id => api.get(`/well/meter/${id}`)

export const insertCanalMeter = payload => api.post(`/canal/meter`, payload)
export const getAllCanalMeters = () => api.get(`/canal/meters`)
export const updateCanalMeterById = (id, payload) => api.put(`/canal/meter/${id}`, payload)
export const deleteCanalMeterById = id =>  api.delete(`/canal/meter/${id}`)
export const getCanalMeterById = id => api.get(`/canal/meter/${id}`)

const apis = {
  insertMeter,
  getAllMeters,
  updateMeterById,
  deleteMeterById,
  getMeterById,

  insertCanalMeter,
  getAllCanalMeters,
  updateCanalMeterById,
  deleteCanalMeterById,
  getCanalMeterById
}

export default apis

