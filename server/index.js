const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('./config/config.js');
require('dotenv').config()
 
const app = express()
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


const apiRoutes =  require('./routes/api.js')(app);
app.use("/api", apiRoutes);

//app.use(cors());


const CONNECTION_URL =
  "mongodb+srv://admin:1234@4me4u.4lr2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



app.get('/', function(req, res) {
  res.sendFile(renderHTML);
})

// Connect to MongoDB

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => 
  app.listen(process.env.PORT, () => 
  console.log("Connection is established on port:" + process.env.PORT)
  )
).catch((err) => console.log(err.message)); 