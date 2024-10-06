const { Router } = require('express');
const institucionRouter = require('./institucion.route.js');
const administradorRouter = require('./administrador.route.js');
const carreraRouter = require('./carrera.route.js');

let apiRouter = Router()
  .use('/instituciones', institucionRouter)
  .use('/administradores', administradorRouter)
  .use('/carreras', carreraRouter);

module.exports =  apiRouter ;
