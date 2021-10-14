/*
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import apiRoutes from "./routes/api.js";

const app = express();

app.use("/api", apiRoutes);

app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://Jefe:1234@4me4u.iyl4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
  }).then(() =>
    app.listen(PORT, () =>
      console.log("Connection is established on port:" + PORT)
    )
  ).catch((err) => console.log(err.message));
*/

//require('./config/config.js');
import config from "./config/config.js";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import apiRoutes from "./routes/api.js";

//const express = require('express')
const app = express()
//const mongoose = require('mongoose');
//const bodyParser = require('body-parser')
import path from "path";
//const path = require('path');

//app.use(bodyParser.urlencoded({extended: false}))
//app.use(bodyParser.json())

import apiIndex from "./routes/index.js";
//app.use(required('./routes/index.js'));

app.use("/api", apiRoutes);
app.use(cors());

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let renderHTML = path.resolve(__dirname, '../public/index.html');

app.get('/', function(req, res) {
  res.sendFile(renderHTML);
})

const CONNECTION_URL =
  "mongodb+srv://Jefe:1234@4me4u.iyl4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//const PORT = process.env.PORT || 3000;
// Connect to MongoDB
//mongoose.connect(process.env.URLDB, {
  /*
  mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true
}, (err) => {
  if(err) throw err;
  console.log("Base de datos online");
});
*/

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => 
  app.listen(process.env.PORT, () => 
  console.log("Connection is established on port:" + process.env.PORT)
  )
).catch((err) => console.log(err.message)); 

/*
app.listen(process.env.PORT, () => {
  console.log("Escuchando el puerto 3000");
})
*/