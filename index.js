const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const coursesRoute = require('./routes/courses')

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/courses', coursesRoute)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((Error) => console.log(Error))
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server running at port ${PORT}`))