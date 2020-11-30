import UserModel from '../models/user.model.js'
import StatusCode from '../../configuration/StatusCodes.js'


const createUser = async (req, res) => {
	const user = new UserModel({
		username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
	})

	try {
		const response = await user.save()
		res.status(StatusCode.CREATED).send(response)
	} catch (error) {
		res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getAllUser = async (req, res) => {
    try{
        const response = await UserModel.find()
        res.status(StatusCode.OK).send(response)
        
    }catch(error){
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
    }
} 

const updateUser = async (req, res) => {
    try {
        if(!req.body) {return res.status(400).send({message: 'Cannot update empty values'})}
        const response = await UserModel.findByIdAndUpdate(req.params.userId, {
            username: req.body.username,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        })
        res.status(StatusCode.OK).send(response)
    }catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: `Could not update User ${req.params.userId}`,
            error: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try{
        const response = await UserModel.findById(req.params.userId)
        res.status(StatusCode.OK).send(response)
    } catch(error){
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Error finding the user " + req.params.userId,
            error: error.message
        })
    }
}

const getUserByUsernameQuery = async (req, res) => {
    try{
        const response = await UserModel.find({username: req.query.username})
		response.length !== 0 
        ? res.status(StatusCode.OK).send(response) 
        : res.status(StatusCode.NOT_FOUND).send({message: 'Could not find user with username ' + req.query.username})
    }catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send( {
            message: "Error finding the user: " + req.query.username,
            error: error.message
        })
    }
}


const deleteUserByName = async (req, res) => {
    try  {
        const response = await UserModel.findByIdAndDelete(req.params.userId)
        res.status(StatusCode.OK).send({
            message:`Sucessfully deleted the User with username: ${response.username} and id: ${req.params.userId}` 
        })
    }catch (error)  {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: 'Error occured while trying to delete user with the id: ' + req.params.userId,
            error: error.message
        })
    }
}

export default {
    updateUser,
    deleteUserByName,
    createUser,
    getAllUser,
    getUserById,
    getUserByUsernameQuery,
}