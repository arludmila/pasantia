const express = require('express');
const administradorRouter = express.Router();
const administradorController = require('../controllers/administrador.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/administradorRoles.utils');
const { createAdministradorSchema, validateLogin } = require('../middleware/validators/administradorValidator.middleware');

administradorRouter.post('/login', validateLogin, administradorController.administradorLogin);

administradorRouter.get('/', administradorController.getAllAdministradores);
administradorRouter.post('/', createAdministradorSchema, administradorController.createAdministrador);


module.exports = administradorRouter;