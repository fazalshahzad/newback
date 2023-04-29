const express = require("express");
const Router = express.Router();//express function router call with (.) 



// Calling The Controller 4th step
const { 
    userRegister,
    userLogin
}= require('../controller/userManagementController')

// Calling The Controller 4th step

Router.post('/userRegister',userRegister)
Router.post('/userLogin',userLogin)


 


    
               


// Calling routes for frontend work......
module.exports=Router; 