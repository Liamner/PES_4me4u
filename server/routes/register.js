//aquí es donde se tiene que encriptar la contraseña y es donde se hace uso de bcrypt

const express = require('express');
//import express from "express";
const bcrypt = require('bcrypt');
//import bcrypt from 'bcryptjs';
const Usuario = require('./../models/user');
//import User from "../models/user.js";
const app = express();

app.post('/register', function (req, res) {
  let body = req.body;
  let { nombre, email, password, role } = body;
  let usuario = new Usuario({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role
    
  });
usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
         ok: false,
         err,
      });
    }
    res.json({
          ok: true,
          usuario: usuarioDB
       });
    })
});
module.exports = app;
//export default app;