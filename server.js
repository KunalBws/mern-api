const express= require('express')
const dotenv = require('dotenv').config()
const colors = require('colors');
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/Db');
const port = process.env.PORT || 5000
const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`App is listening to port ${port}`)
})

