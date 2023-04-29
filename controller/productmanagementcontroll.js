
const ProductModel = require('../models/ProductManagementmodel');   
const fs = require("fs");
const ProductData = async(req , res)=>{
try {

    // ******************************************* When Create middle-Ware for backend then use this ( 1st step ) ******************************************//

    // const {ProductName,ProductPrice,ProductQuantity} = req.body;  // after creating simple api next is destruct two properties ⤵️
    //  console.log(req.body);  //check frontend Data   

    //  const DocToCreate = new ProductModel({
    //     ProductName,                                                //Now create query Before Query import ProductModel
    //     ProductPrice,
    //     ProductQuantity,
    //     ProductImageUrl: `/assets/ProductImages/${req.file.filename}`,
    //     ProductImageName: req.file.originalname,
    //     ProductImageMimeType: req.file.mimetype,
        
    // })
    
    // const DocToSave = await DocToCreate.save();                    // and save
    
    //Hey Please Save this Data to My DataBase //IOBlocking await
    // res.json({
    //     // Message:`You have reached at the end point of API now go to hell(🔥🔥🔥🔥)`, 1st step
    //     //Body:req.body
    //     // Body:`${ProductName} \n ${ProductPrice}`                 (and shoe here)                        ◀️◀️◀️◀️                   ◀️◀️◀️◀️           //line n 6 first check this and then (DocToCreate)
    //     Message:`Data Saved Successfully`,
    //     Body:DocToSave,
    //     Data:True
    // });

    // ******************************************* When Create middle-Ware for backend then use this ******************************************//


// ********** Checking for forntend response **************//
// console.log(req.files);
// console.log(req);

    // res.json({
    //     Message:'You have reached the end-point Salman',          // when u get data from frontend then use this....
    //     Body:req.body,
    //     Data:true
    // })
// ********** Checking for forntend response **************//


// for ( 1st step ) ▶️ u cannot use  filelist because frontend images are in req.filelist multer cannot understand filelist it understand only array
// so we can convert filelist in array........ 


const {productName,quantity,price,companyName,color,description,category} = req.body

let imageDetailsArray=[];
let Size = req.body.size.split(',');
// Size;
// return  for debugging purpose go to 4 th option save search push debuger and run js debugger then run npm run dev

req.files.forEach(element => {
    const { filename,originalname,mimetype }=element; 
  //  imageDetailsArray.push({filename,originalname,mimetype}) or checking Images Details....  No set the value as productmanagement model.js
  imageDetailsArray.push({
      ProductImageUrl:`assets/ProductImages/${productName}/${filename}`,
      ProductImageName :originalname,
    ProductImageMimeType :mimetype
  })    
});
// return for debugging purpose
// Now Create Product-Schema...
 
const DocToCreate = new ProductModel({
    productName,
    quantity,
    price,
    companyName,
    color,
    size:Size,
    description,
    ProductImages:imageDetailsArray,
    category,
})
const DocToSave = await DocToCreate.save();
 
console.log(DocToSave); 
res.json({
    Message:`Your Data is saved Successfully`,          // when u get data from frontend then use this....
    Body:DocToSave,
    Data:true
})

} catch (error) {
    console.log(error);
    res.json({
        Message:error.message,
        Result:null,
        Data:false
    });
}
}


// **************************************************************************************** get All Product  ***********************************************//
const GetProductData = async (req,res)=>{
    try {
    
        const DoctToGet = await ProductModel.find()
        res.json({
            Message:'Document has found',
            Data:true,
            Result:DoctToGet
        })
    } catch (error) {
       res.json({
        Message:error.message,
        Result:null,
        Data:false
       })
    }
}
// *************************************************** Get Data With ID for frontend//
const getDocumentById = async (req,res)=>{                           // stop there ✋✋✋        // frontend get api first create (getDocumentById) and export it through destrcut
    try {
        const ID = req.params.Id;
        const docToFind = await  ProductModel.findOne({_id:ID})
        res.json({
            Message:"Data Found",
           Data:true,
           Result:docToFind
        })
    } 
    catch (error) {
        res.json({
            Message:error.message,
            Result:null,
            Data:false
           })
    }
    
    }

// **************************************************************************************** Soft Delete Product By ID  ***********************************************//

const DeleteProductById = async(req,res)=>{
    try {
        const ID = req.params._id
      const DocToDelete = await ProductModel.updateOne(
        {_id:ID},
        {$set:{softDelete:1}}
      );
        res.json({
            Message:'Document has been Deleted',
            Data:true,
            Result:DocToDelete
        })
    } catch (error) {
       res.json({
        Message:error.message,
        Result:null,
        Data:false
       })
    }
}
// **************************************************************************************** Hard Delete Product By ID  ***********************************************//
const hardDeleteProductById = async (req,res)=>{
try {
    const ID = req.params._id
    const docToGet = await ProductModel.findOne(
        {_id:ID}
    ).lean()
    
   if(!!docToGet){
    const docToDelete = await ProductModel.deleteOne(
        {_id:docToGet._id}
    )
    docToGet.ProductImages.forEach(removeFilePath=>{
        fs.unlinkSync(`${removeFilePath.ProductImageUrl}`)
    })
    fs.rmdirSync(`./assets/ProductImages/${docToGet.productName}`)
res.json({
    Message:"Data Delete Successfuly",
    Result:docToDelete,
    data:true
})
   }else{
    res.json({
        Message:"Data Not Deleted",
        Result:null,
        data:true
    })
   }
} catch (error) {
    res.json({
        Message:error,
        Result:null,
        Data:false
       })
}
}
// **************************************************************************************** UpDate Product By ID  ***********************************************//
const updateProductById = async (req,res)=>{
try {
    const ID = req.body._id;
    const PayLoad = req.body;

  const docToUpDate = await ProductModel.updateOne(
    {_id:ID},
    PayLoad
  )
   res.json({
    Message:`Document has been Updated`,
    Result: docToUpDate,
    data:true
   })
} catch (error) {
    res.json({
        Message:error,
        Result: null,
        data:false
       })
}
}
// **************************************************************************************** get data by company name  ***********************************************//
const getDataWithCompanyName = async (req,res)=>{
    try {
        const CompanyName = req.body.CompanyName
        const docToFInd = await ProductModel.find(
            {
              $match:{companyName:CompanyName}
            }
        )
        res.json({
            Message:'Data find successfuly',
            Result:docToFInd,
            Data:true
        })
        
    } catch (error) {
        res.json({
            Message:error,
            Result:null,
            Data:false
        })
    }
}









// **************************************************************************************** UpDate Product Image By ID  ***********************************************//
const updateProductImageById = async (req,res)=>{
    try {
        const {oldProductId,oldImageDetails,newImageDetails} = req.body
        const docToGet = await ProductModel.findOne(
            {_id:oldProductId}
        )
    } catch (error) {
        
    }
}












// ***************************************************************************************************************************************api checke-old **********************************************//
// {Status:0},//Condition
            // {ProductPrice:1800});//Projection
            //option
            //get(find() or findOne()

// const GetProductData = async (req,res)=>{
//     try {
           
            
//         const DoctToGet = await ProductModel.find()
//         res.json({
//             Message:'Document has found',
//             Data:true,
//             Result:DoctToGet
//         })
//     } catch (error) {
//        res.json({
//         Message:error.message,
//         Result:null,
//         Data:false
//        })
//     }
// }

const UpDateProductData = async(req,res)=>{
    try {
        // const DoctToUpDate = await ProductModel.updateMany({Status:1},{Status:0});
      const DoctToUpDate = await ProductModel.updateMany({_id:'62e7e0f03d629fe1e90bf0ca'},{ProductPrice:1600});
        res.json({
            Message:'Document has Updated',
            Data:true,
            Result:DoctToUpDate
        })
        //(Update() Updatemany())
    } catch (error) {
       res.json({
        Message:error.message,
        Result:null,
        Data:false
       })
    }
}

// const DeleteProductData = async(req,res)=>{
//     try {
        
//       const DoctToDelete = await ProductModel.deleteMany({Status:0});
//         res.json({
//             Message:'Document has Deleted',
//             Data:true,
//             Result:DoctToDelete
//         })
//     } catch (error) {
//        res.json({
//         Message:error.message,
//         Result:null,
//         Data:false
//        })
//     }
// }



module.exports={
    ProductData,
    GetProductData,
    UpDateProductData,
    DeleteProductById,      // soft delete
    hardDeleteProductById,   //hard delete
    getDocumentById,                             // frontend get api
    updateProductById,
    getDataWithCompanyName
}
//3rd Step
