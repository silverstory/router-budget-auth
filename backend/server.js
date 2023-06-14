require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const cors = require("cors");

// express app
const app = express()

app.use(cors());

// var corsOptions = {
//   origin: "http://localhost:5173"
// };

// app.use(cors(corsOptions));

// middleware
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })