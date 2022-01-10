const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./config/config.js');
require('dotenv').config();
 
const app = express()
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const apiRoutes =  require('./routes/api.js')(app);
app.use("/api", apiRoutes);


// Connect to MongoDB

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => 
  app.listen(process.env.PORT, () => 
  console.log("Connection is established on port:" + process.env.PORT)
  )
).catch((err) => console.log(err.message)); 