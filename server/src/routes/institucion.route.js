const express = require('express');
const institucionRouter = express.Router();
const institucionController = require('../controllers/institucion.controller');
const Role = require('../utils/administradorRoles.utils');
const auth = require('../middleware/auth.middleware'); 
const { createInstitucionSchema, updateInstitucionSchema } = require('../middleware/validators/institucionValidator.middleware');

institucionRouter.get('/', institucionController.getAllInstituciones);
institucionRouter.post('/', auth(Role.SuperUser), createInstitucionSchema, institucionController.createInstitucion);
institucionRouter.patch('/id/:id', auth(Role.SuperUser), updateInstitucionSchema, institucionController.updateInstitucion);


module.exports = institucionRouter;