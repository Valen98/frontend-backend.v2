import userController from '../controllers/user.controller.js'

const routes = (app) => {
    app.post('/user', userController.createUser)
    app.get('/user', userController.getAllUser)
    app.get('/user/:userId', userController.getUserById)
    app.get('/searchuser', userController.getUserByUsernameQuery)
    app.put('/user/:userId', userController.updateUser)
    app.delete('/user/:userId', userController.deleteUserByName)
}

export default {
    routes
}