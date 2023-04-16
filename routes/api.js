'use strict'
const express = require('express');
const api = express.Router();
const { body } = require('express-validator');

var CrearUsuarioController = require('../controllers/usuariosController');
var AlumnosController = require('../controllers/alumnos');
let AuthController = require('../controllers/auth');
var MaestrosController = require('../controllers/maestrosController');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

// Endpoint Usuarios
api.get("/usuarios", userProtectUrl, CrearUsuarioController.usuarios);
api.get("/usuario/:mail", userProtectUrl, CrearUsuarioController.usuario);
api.post("/crearUsuario", userProtectUrl, [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty(),
], CrearUsuarioController.crear_usuario);
api.put("/usuario/:mail",[
    body('pass').not().isEmpty(),
], userProtectUrl, CrearUsuarioController.update_usuario);
api.delete("/usuario/:mail", userProtectUrl, CrearUsuarioController.delete_usuario);

// Endpoint Alumnos
api.get("/alumnos", AlumnosController.alumnos);
api.get("/alumno/:n_lista", AlumnosController.alumno);
api.post("/alumno", userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.crear_alumno);
api.put("/alumno/:n_lista",[
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.update_alumno);
api.delete("/alumno/:n_lista", AlumnosController.delete_alumno);

// Endpoint Iniciar Sesión
api.post("/login",[
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()
], AuthController.login);
api.post("/logout", userProtectUrl, AuthController.logout);

// Endpoint Maestros
api.get("/maestros", MaestrosController.maestros);
api.get("/maestro/:n_lista", MaestrosController.maestro);
api.post("/maestro", userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], MaestrosController.crear_maestro);
api.put("/maestro/:n_lista",[
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], MaestrosController.update_maestro);
api.delete("/maestro/:n_lista", MaestrosController.delete_maestro);

module.exports = api;