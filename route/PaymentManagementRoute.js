const express = require ('express');
const Router = express.Router();

// Accquring MiddleWares
// const {AuthorizeAdmin} = require ('../middle-wares/AdminAuthorization')
// Accquring MiddleWares

// Accquring Controllers
const { PayWithStripe } = require ('../controller/PayWithStripe')
// Accquring Controllers

// Define Routers
Router.post('/PayWithStripe',PayWithStripe)
// Define Routers

//Export
module.exports=Router