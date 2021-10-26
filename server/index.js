const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
require('./config/config.js');
const cloudinary = require('cloudinary').v2;
 

/*
cloudinary.config({
  cloud_name: '',
  api_key: '',
  api_secret: ''
});
*/
const app = express()
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


const apiRoutes =  require('./routes/api.js')(app);
app.use("/api", apiRoutes);

//app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://Jefe:1234@4me4u.iyl4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.static(__dirname+'/public'));

let renderHTML = path.resolve(__dirname, '../public/index.html');

app.get('/', function(req, res) {
  res.sendFile(renderHTML);
})

const PORT = process.env.PORT || 5000;
// Connect to MongoDB

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => 
  app.listen(process.env.PORT, () => 
  console.log("Connection is established on port:" + process.env.PORT)
  )
).catch((err) => console.log(err.message)); 