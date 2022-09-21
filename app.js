const express = require('express')
const app = express()
const tasks = require('./routes/tasks')

const connectDB = require('./db/connect')
require('dotenv').config()

const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

const port = process.env.PORT || 3000

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks)

app.use('*', notFound) //for paths that don't exist
app.use(errorHandler) //to handle errors after the asyncWrapper middleware does a next()



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    }
    catch (err) {
        console.log(err)
    }
}

start()
