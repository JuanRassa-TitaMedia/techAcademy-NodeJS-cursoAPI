'use strict'

const { validationResult } = require('express-validator');

var Maestros = require('../models/maestrosModel');

var controller = {
    maestros: function(req, res){
        console.log("Listar Maestros")
        Maestros.find({}).exec( (err, maestros) =>{
          if(err) return res.status(500).json({status: 500,mensaje: err});
          if(!maestros) return res.status(200).json({status: 200,mensaje: "No hay maestros por listar."});
          
          return res.status(200).json({
            status: 200,
            data: maestros
          });
          
        });
        
      },
      
      maestro: function(req, res){
      console.log("Listar Detalle Maestro")
        
        let n_lista = req.params.n_lista;

        Maestros.findOne({n_cuenta: n_lista}).exec( (err, maestro) =>{
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(!maestro) return res.status(200).json({status: 200,mensaje: "No se encontró el maestro."});

            return res.status(200).json({
                status: 200,
                data: maestro
            });

        });

    },

    crear_maestro: function(req, res){
      console.log("Crear Maestro")
        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        let user_info = req.body;


        Maestros.findOne({n_cuenta: user_info.n_cuenta}).exec( (err, maestro) =>{
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(maestro) return res.status(200).json({status: 200,mensaje: `El numero de cuenta ${user_info.n_cuenta} ya existe.`});
        
            let maestros_model = new Maestros();

            maestros_model.n_cuenta = user_info.n_cuenta;
            maestros_model.nombre = user_info.nombre;
            maestros_model.edad = user_info.edad;
            maestros_model.genero = user_info.genero;
            maestros_model.materia = user_info.materia;

            maestros_model.save((err, maestroStored) => {
                if(err) return res.status(500).json({status: 500,mensaje: err});
                if(!maestroStored) return res.status(200).json({status: 200,mensaje: "No se logro almancenar al maestro."});
            });

            return res.status(200).json({
                status: 200,
                message: "Usuario almacenado."
            });
        
        });

    },

    update_maestro: function(req, res) {
      console.log("Update Maestro")
        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        let n_lista = req.params.n_lista;
        let user_info = req.body;

        let maestro_info_update = {
            nombre: user_info.nombre, 
            edad: user_info.edad, 
            genero: user_info.genero, 
            materia: user_info.materia
        };

        Maestros.findOneAndUpdate({n_cuenta: n_lista}, maestro_info_update, {new:true}, (err, maestroUpdate) => {
            if(err) return res.status(500).json({message: 'Error al actualizar.'});
            if(!maestroUpdate) return res.status(404).json({message: 'No existe el maestro.'});


            console.log(maestroUpdate);

            return res.status(200).json({
                nombre: maestroUpdate.nombre, 
                edad: maestroUpdate.edad, 
                genero: maestroUpdate.genero, 
                materia: maestroUpdate.materia 
            });


        });

        
        
    },

    
    delete_maestro: function(req, res) {
        console.log("Delete Maestro")
        let n_lista = req.params.n_lista;

        Maestros.findOneAndRemove({n_cuenta: n_lista}, (err, maestroDelete) => {
            if(err) return res.status(500).json({message: 'Error al eliminar.'});
            if(!maestroDelete) return res.status(404).json({message: 'No existe el maestro.'});

            return res.status(200).json({
                message: "Maestro eliminado."
            });

        });

    }
    

};
module.exports = controller;