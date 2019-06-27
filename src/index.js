const express = require('express')
require('./db/mongoose')

const userRouter = require('./Routers/user')
const salesRouter = require('./Routers/sales')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(salesRouter)

app.listen(port, ()=>{
    console.log('Server is up ' + port)
})