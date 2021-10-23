require('./config/config.js');

const express = require('express')
const app = express()
const cors=require("cors");
const corsOptions ={
   origin:'http://localhost:19006', 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRoutes = require('./routes/api.js');
app.use("/api", apiRoutes);

let renderHTML = path.resolve(__dirname, '../public/index.html');

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