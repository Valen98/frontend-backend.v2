import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectToDatabase = async () => {
    const DB_URL = process.env.DATABASEURL
    try{
        await mongoose.connect(`${DB_URL}`, {useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Succesfully connected to databe")
    }catch (error){
        console.log("error with connection" + error)
    }
}


const connectToPort = app =>{
    const port = process.env.port
    app.listen(port, () => {
        console.log(`This is running on ${port}`)
    })
}


export default {
    connectToDatabase,
    connectToPort
}