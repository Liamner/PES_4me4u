require('./config/config.js');

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const apiRoutes = require('./routes/api.js');
app.use("/api", apiRoutes);

let renderHTML = path.resolve(__dirname, '../public/index.html');

app.get('/', function(req, res) {
  res.sendFile(renderHTML);
})

const CONNECTION_URL =
  "mongodb+srv://Jefe:1234@4me4u.iyl4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => 
  app.listen(process.env.PORT, () => 
  console.log("Connection is established on port:" + process.env.PORT)
  )
).catch((err) => console.log(err.message)); 
