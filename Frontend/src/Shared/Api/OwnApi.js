import axios from 'axios'

const OwnApi = axios.create({
    baseURL: 'http://localhost:1338'
})

export default OwnApi