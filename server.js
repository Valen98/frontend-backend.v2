import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import Configuration from './configuration/configuration.js'
import middlewares from './src/middelwares/middlewares.js'
import userRoutes from './src/routes/user.routes.js'

dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('common'))

//userRoutes.routes(app)
app.use("/users", userRoutes)
// app.use(middlewares.notFound)
// app.use(middlewares.errorHandler)
Configuration.connectToDatabase()
Configuration.connectToPort(app)

if(process.env.NODE_ENV === "production") {
}
app.use(express.static('frontend/build'))

export default app