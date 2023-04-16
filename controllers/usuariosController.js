'use strict'

const { validationResult } = require('express-validator');

var Usuarios = require('../models/usuarios');

var controller = {
    usuarios: function (req, res) {
        console.log("Listar Usuarios")
        Usuarios.find({}).exec((err, usuarios) => {
            if (err) return res.status(500).json({ status: 500, mensaje: err });
            if (!usuarios) return res.status(200).json({ status: 200, mensaje: "No hay usuarios por listar." });

            return res.status(200).json({
                status: 200,
                data: usuarios
            });

        });

    },

    usuario: function (req, res) {
        console.log("Listar Detalle Usuario")

        let mail = req.params.mail;

        Usuarios.findOne({ mail: mail }).exec((err, usuario) => {
            if (err) return res.status(500).json({ status: 500, mensaje: err });
            if (!usuario) return res.status(200).json({ status: 200, mensaje: "No se encontró el usuario." });

            return res.status(200).json({
                status: 200,
                data: usuario
            });

        });

    },

    crear_usuario: function (req, res) {
        console.log("Crear Usuario")
        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user_info = req.body;
        console.log(user_info)

        Usuarios.findOne({ mail: user_info.mail }).exec((err, usuario) => {
            if (err) return res.status(500).json({ status: 500, mensaje: err });
            if (usuario) return res.status(200).json({ status: 200, mensaje: `El usuario con mail "${user_info.mail}" ya existe.` });

            let usuarios_model = new Usuarios();

            usuarios_model.mail = user_info.mail;
            usuarios_model.pass = user_info.pass;

            usuarios_model.save((err, usuariosStored) => {
                if (err) return res.status(500).json({ status: 500, mensaje: err });
                if (!usuariosStored) return res.status(200).json({ status: 200, mensaje: "No se logro almancenar al usuario." });
            });

            return res.status(200).json({
                status: 200,
                message: "Usuario almacenado."
            });

        });

    },

    update_usuario: function (req, res) {
        console.log("Update Usuario")
        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let mail = req.params.mail;
        let user_info = req.body;

        let usuario_info_update = {
            pass: user_info.pass
        };

        Usuarios.findOneAndUpdate({ mail: mail }, usuario_info_update, { new: true }, (err, usuarioUpdate) => {
            if (err) return res.status(500).json({ message: 'Error al actualizar.' });
            if (!usuarioUpdate) return res.status(404).json({ message: 'No existe el usuario.' });


            console.log(usuarioUpdate);

            return res.status(200).json({
                pass: usuarioUpdate.pass
            });


        });



    },


    delete_usuario: function (req, res) {
        console.log("Delete Usuario")
        let mail = req.params.mail;

        Usuarios.findOneAndRemove({ mail: mail }, (err, usuarioDelete) => {
            if (err) return res.status(500).json({ message: 'Error al eliminar.' });
            if (!usuarioDelete) return res.status(404).json({ message: 'No existe el usuario.' });

            return res.status(200).json({
                message: "Usuario eliminado."
            });

        });

    }
};
module.exports = controller;