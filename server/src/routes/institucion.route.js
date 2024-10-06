const express = require('express');
const institucionRouter = express.Router();
const institucionController = require('../controllers/institucion.controller');
const { createInstitucionSchema, updateInstitucionSchema } = require('../middleware/validators/institucionValidator.middleware');

institucionRouter.get('/', institucionController.getAllInstituciones);
institucionRouter.post('/', createInstitucionSchema, institucionController.createInstitucion);
institucionRouter.patch('/id/:id', updateInstitucionSchema, institucionController.updateInstitucion);


module.exports = institucionRouter;