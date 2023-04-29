const express = require("express");// Only ImPort Express frameWork 
const cors = require("cors");
const app = express();//All the Classes of Express FrameWork in App now you can get any class with (.) bracket is use because its a class
const ApplicationConfig = require ('./Configration/LoadMyConfig-Env-file')

const ResponseOfMyDataBaseConnection = require("./Configration/DatabaseConfigration");
const PORT = process.env.PORT||5050;
//Block Dependencies


//Block Start Initialize the app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(express.raw());
app.use(cors());
app.use('/assets',express.static('assets')); //Route in image path
//Block Start Initialize the app


//Start Block Setting th Headers for your Application
app.all('*', (req, res, next) => {
    // This is how we protect the api
    res.header('Access-Control-Allow-Origin', '*');// So it make the header allow to the origin when cross platfrom try to exchange the data
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        //Mehtod is a property which help us to use the Methods by request. Browers send the options request before your Mthods request
    }
    next(); //if nothing of the response sent back so next() means other route
});
//End Block Setting the Header for your Application


//Now calling (📱📱) My Routes
const ProductManagementRouter = require("./route/productmanagementroute");
const AdminmanagementRouter = require ('./route/AdminmanagementRoute');
const UsermanagementRouter = require ('./route/userMangementRoute')
const PaymentManagement = require('./route/PaymentManagementRoute');
const _EmailService =   require('./route/emailManagementRouter');
/*******************************Using Routes*************/
app.use("/ProductManagement",ProductManagementRouter);
app.use('/AdminmanagementRouter',AdminmanagementRouter);
app.use('/UsermanagementRouter',UsermanagementRouter)
app.use('/PaymentManagement',PaymentManagement);
app.use('/emailService',_EmailService)
/*******************************Using Routes*************/

// Set after calling routes because its interpreter language......
//Start Block Checking Routes As express not found Url not Founded we need to do it explicitly 
app.use((req, res, next) => {
    const error = new Error('Url not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    })
});
//End Block Checking Routes As express not found Url not Founded we need to do it explicitly 

app.listen(PORT,()=>{
    console.log(`Your Server has been launched (🚀🚀🚀🚀) ${PORT}`);
    
});
// yahan tak http//localhost:2400=>(slag) ka matlab hay
// 1st step



// (1st-Step) First of All Create Simple API server.js to controller  (create api)
// (2st-Step) now install Mongoose first(1st) work of Mongoose-Driver is Connection so create configration folder and make DatabaseConfig.js 

//******************* Product-Management */

//second(2nd) Work 
//  mongoose.schema ((is a function only take one argument that is object)) so create model so make model folder and then make product-model.js file now crete model.
// and third step is mongoose.model it create model in database it takes 2 arguments 1st argument is create collections and 2nd arguments is variable and import 
// ProductSchema in controller.js
// (3rd-Step) create middleWare Folder and add (Allow-Headers-Section in server.js and create function for display 404-error when url not found) 
// (4th-Step) create get api in product-management-controller.js and create update api and then create  delete api
// (5th-Step) create first middleware then import in product-management-router and set in which api u want and now create middle-ware for image and install 
// multer and import in upload-media after creating middle-ware now add ImageUrl: { type: String },ImageName: { type: String },   ImageMimeType: { type: String },in product-
// management-model now add in controller.js and then import in router.js and then add in post api with.single(Image==>exact same argument name in formData) and then
// intialize app.use('/assets',express.static('assets')) in server.js
    
//************************ Admin-Mangement */

//6th step create Admin-Schema in Model install bcrypt  bcrypt.gnsalt  bcrypt.hash
//7th step create dev,prod,test file in dev.env file create port and connect-mongo uri and initialize salt value.
//install dotenv package and create load my configration file and then call in server.js
//8th step now import in admin-controller.js. install jwt and require bcrypt for compare login password bcrypt.compare
//9th step Calling Controller in (Admin-Management-Route) and then defining routes now go to server.js calling (📱📱) My Routes
// 10th first create admin register and then create login and then go to admin register and set middleware and then 

 
//***************** Stripe-Payment-Mangement */

//1st step install npm i stripe and then create dummy account in stripe in (devolper-mode) and then create controller (Pay-With-Stripe)
//and then create (route) and call in server.js

// (2nd-step knowldge 1st-arguments) sql create tables and rows 
// non-sql create collections on the place of table and create object on the place of rows


// ****************** Get Data With ID for frontend **********************//

// 1st go to fronted (Product-service) .....
// 2nd go to controller .......