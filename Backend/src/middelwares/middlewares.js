import dotenv from 'dotenv'
dotenv.config()

const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl} `)
    res.status(404)
    next(error)
}

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        statusCode: statusCode,
        message: error.message,
        stacktrace: process.env.ENVIROMENT === 'PRODUCTION' ? 'AHAH' : error.stack
    })
}

export default({
    notFound,
    errorHandler
})
