const routes = require('express').Router();
const { User } = require('./app/models');
// Definição rotas;

User.create({
    name: "Luã",
    email: "lua.enriquezan@gmail.com",
    password_hash: "3i21031902831920", 
});

module.exports = routes;