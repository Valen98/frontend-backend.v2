import userController from '../controllers/user.controller.js'
import express from 'express'

const userRoutes = express.Router()

userRoutes.post('/user', userController.createUser)
userRoutes.get('/user', userController.getAllUser)
userRoutes.get('/user/:userId', userController.getUserById)
userRoutes.get('/searchuser', userController.getUserByUsernameQuery)
userRoutes.put('/user/:userId', userController.updateUser)
userRoutes.delete('/user/:userId', userController.deleteUserByName)


export default userRoutes