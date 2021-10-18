//importar dependencias que se requieren para el funcionamiento
const express = require('express');
//import express from "express";

const bcrypt = require('bcrypt');
//import bcrypt from 'bcryptjs';

const jwt = require('jsonwebtoken');
//import jwt from "jsonwebtoken";

const Usuario = require('./../models/user');
//import User from "../models/user.js";
const app = express();

app.post('/login', function (req, res) {
    // here write code
    let body = req.body;

    Usuario.findOne({ email: body.email }, (erro, usuarioDB)=>{
        if (erro) {
          return res.status(500).json({
             ok: false,
             err: erro
          })
       }
        // Verifica que exista un usuario con el mail escrita por el usuario.
        if (!usuarioDB) {
            return res.status(400).json({
            ok: false,
            err: {
                message: "ROUTES LOGIN - Usuario o contraseña incorrectos: no existe el usuario"
            }
            })
        }
        // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
        if (!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos: la contraseña es incorrecta"
                }
            });
        }
        // Genera el token de autenticación
        let token = jwt.sign({
                usuario: usuarioDB,
            }, process.env.SEED_AUTENTICACION, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        })
        res.json({
            ok: true,
            usuario: usuarioDB,
            token,
        })
    })
});

module.exports = app;
//export default app;