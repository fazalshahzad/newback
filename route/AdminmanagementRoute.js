const express = require ('express');
const Router = express.Router();

// Accquring MiddleWares
const {AuthorizeAdmin} = require ('../middle-wares/AdminAuthorization')
// Accquring MiddleWares

// Accquring Controllers
const { AdminRegister , AdminLogin} = require ('../controller/adminmanagementcontroller')
// Accquring Controllers

// Define Routers
Router.post('/AdminRegister',AuthorizeAdmin,AdminRegister) // two layers of security login ma token 2nd token expire
Router.post('/AdminLogin',AdminLogin)
// Define Routers

//Export
module.exports=Router