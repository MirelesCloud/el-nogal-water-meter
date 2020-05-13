import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api'
})

export const insertMeter = payload => api.post(`/meter`, payload)
export const getAllMeters = () => api.get(`/Meters`)
export const updateMeterById = (id, payload) => api.put(`/meter/${id}`, payload)
export const deleteMeterById = id =>  api.delete(`meter/${id}`)
export const getMeterById = id => api.get(`/meter/${id}`)

const apis = {
  insertMeter,
  getAllMeters,
  updateMeterById,
  deleteMeterById,
  getMeterById
}

export default apis
