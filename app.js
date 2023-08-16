require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const ErrorHandlerMiddleware = require('./WeSociety.Api/Middlewares/ErrorHandlerMiddleware')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors())




//Require Routes
require("./WeSociety.Api/Routes/AllRoutes")(app);

app.use(ErrorHandlerMiddleware)
app.listen(4000, () => {
    console.log("Server started at 4000");
})