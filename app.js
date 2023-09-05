require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload');
const ErrorHandlerMiddleware = require('./WeSociety.Api/Middlewares/ErrorHandlerMiddleware')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())
app.use(fileUpload({
  createParentPath: true
}));


app.use(function(req, res, next) {
    for (var key in req.body)
    { 
      req.body[key.charAt(0).toUpperCase()+key.slice(1)] = req.body[key];
    }
    next();
  });

//Require Routes
require("./WeSociety.Api/Routes/AllRoutes")(app);

app.use(ErrorHandlerMiddleware)
app.listen(4000, () => {
  console.log("Server started at 4000");
})