// commande.routes.js

const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commande.controllers');
const { checkJwt } = require('./jwtMiddleware'); // Adjust as per your JWT middleware

module.exports = app => {
    router.post('/', checkJwt, commandeController.createOrder);
    app.use('/api/commande', router);
};
