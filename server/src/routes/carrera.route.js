const express = require('express');
const carreraRouter = express.Router();
const carreraController = require('../controllers/carrera.controller');
const Role = require('../utils/administradorRoles.utils');
const auth = require('../middleware/auth.middleware'); 
const { createCarreraSchema } = require('../middleware/validators/carreraValidator.middleware');


carreraRouter.get('/', carreraController.getAllCarreras);
carreraRouter.post('/', auth(Role.SuperUser), createCarreraSchema, carreraController.createCarrera);


module.exports = carreraRouter;