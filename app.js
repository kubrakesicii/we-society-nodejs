const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const ErrorHandlerMiddleware = require('./WeSociety.Api/Middlewares/ErrorHandlerMiddleware')

// app.use(cors)
app.use(bodyParser.urlencoded({extended:false}))





//Require Routes
require("./WeSociety.Api/Routes/AllRoutes")(app);

app.use(ErrorHandlerMiddleware)
app.listen(4000, () => {
    console.log("Server started at 4000");
})