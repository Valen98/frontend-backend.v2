import http from '../OwnAPI'

const getAllUsers = () => {
    return http.get(`/user`)
}

export default {
    getAllUsers
}
