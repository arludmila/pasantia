const { Router } = require('express');
const institucionRouter = require('./institucion.route.js');
const administradorRouter = require('./administrador.route.js');

let apiRouter = Router()
  .use('/instituciones', institucionRouter)
  .use('/administradores', administradorRouter);

module.exports =  apiRouter ;
