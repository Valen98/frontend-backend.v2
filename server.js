import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import Configuration from './configuration/configuration.js'
import middlewares from './src/middelwares/middlewares.js'
import userRoutes from './src/routes/user.routes.js'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

userRoutes.routes(app)
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)
console.log("new text")
Configuration.connectToDatabase()
Configuration.connectToPort(app)

if(process.env.NODE_ENV === "production") {
        app.use(express.static('frontend/build'))
}