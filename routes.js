const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const ContatoController=require('./src/controllers/ContatoController');
const {loginRequired}=require('./src/middlewares/middleware');

// Rotas da home
route.get('/Index',loginRequired, homeController.Index);

// Rotas de Login
route.get('/login', loginController.Index);
route.get('/', loginController.Index);
route.post('/login/register', loginController.register);
route.post('/login/logar', loginController.login);
route.get('/login/logout', loginController.logout);

// Contato
route.get('/contato/Index',loginRequired, ContatoController.Index);
route.post('/contato/register',loginRequired, ContatoController.register);
route.get('/contato/register/:id',loginRequired, ContatoController.EditIndex);
route.post('/contato/register/:id',loginRequired, ContatoController.Edit);
route.get('/contato/delete/:id',loginRequired, ContatoController.delete)

module.exports = route;
