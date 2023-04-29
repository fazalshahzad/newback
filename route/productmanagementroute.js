const express = require("express");
const Router = express.Router();//express function router call with (.) 
const product = require('../models/ProductManagementmodel');


// Calling The Controller 4th step
const { ProductData,
      GetProductData,
      getDocumentById,                                                     // Testing-Data-Base is (Data-Base) Name and then Collection is (productCollections) and in this productCollections Documents
      DeleteProductById,     // soft delete                           // Which is actually called (Objects) and in sql Testing-Data-Base is (Data-Base) and  (productCollections) is table and then (rows)
      hardDeleteProductById,  //hard delete
    //   UpDateProductData,       // frontendData api
      updateProductById,
      getDataWithCompanyName
}= require("../controller/productmanagementcontroll")

// Calling The Controller 4th step


// Calling My MiddleWares
const {
    UploadProductImage
}=require('../middle-wares//Upload-Media'); 

// Calling My MiddleWares  

Router.post("/ProductData",UploadProductImage.array('images',5),ProductData);                                                   //create
Router.get("/GetProductData",GetProductData) 
Router.get(`/getDocumentById/:Id`,getDocumentById )                                                                                            //read
Router.delete(`/DeleteProductById/:_id`,DeleteProductById)    // soft Delete
Router.delete(`/hardDeleteProductById/:_id`,hardDeleteProductById)    // soft Delete
//Router.post("/UpDateProductData/",UpDateProductData) //We can Use Put But Sometimes We Send Payload So That's Why I  Use Post        //update
Router.post("/updateProductById/",updateProductById) 
Router.get(`/getDocumentByComapanyName/:CompanyName`, getDataWithCompanyName)   
    
               


// Calling routes for frontend work......
module.exports=Router; 

