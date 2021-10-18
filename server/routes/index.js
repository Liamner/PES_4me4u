const express = require('express')
//import express from "express";
const app = express()

//import appLogin from "./login.js";
//import appRegister from "./register.js";
app.use(require('./login'));
app.use(require('./register'));
module.exports = app;

//export default app;