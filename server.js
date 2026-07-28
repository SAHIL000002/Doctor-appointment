const express  = require('express')
const connectdb = require('./config/db')
const app = express()

connectdb();



app.listen(PORT , function(){
    console.log(`server is running at ${PORT}`)
})