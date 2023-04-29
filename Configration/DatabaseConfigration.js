const Package = require("../package.json");
const mongoose= require("mongoose");
mongoose.connect(`${process.env.MONGO_URI}`,{useNewUrlParser:true,useUnifiedTopology:true},(error,connection)=>{  
    if(!error){
console.log(`\nMongoDb connected SucessFully at MongoAtlas WithDatabBase\n`);
console.log(`\nYour ap has following Dependencies\n`);
for(let dependencies in Package.dependencies){      //loop in object keys so use for in loop
    console.log(dependencies);
}

    }
    else {console.log(`Error:Not Connected to the MongoDb` + error)}
})

// useNewUrlParser:true (protocols or database rules ) allow to convert BSON (Binary-javascript-object-notation) (0-1 form) Data to Json

//mongoose.connect('mongodb+srv://ecom-123:ecom-123@e-commerce.pgkqfrl.mongodb.net/E-Commerce?retryWrites=true&w=majority',
//{useNewUrlParser:true,useUnifiedTopology:true},(error,connection)=>{ 1st step without dev.env 