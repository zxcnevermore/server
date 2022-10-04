
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const orderRouter = require('./routes/orders.routes')
const corsMiddleware = require('./middleware/cors.middleware')

const app = express();
const port = process.env.PORT || 8080


app.use(corsMiddleware)
app.use(express.json())
app.use("/", orderRouter)
app.use("/api", orderRouter)
app.use("/api/get", orderRouter)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB)

    app.listen(port, () => {
      console.log("server start on PORT" + port)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
