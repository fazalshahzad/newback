//Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');   //secure-Password
const SaltRounds = parseInt (process.env.SALT_ROUND); //hashes and convert mix strings

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const time = today.getTime();

//Start Block Schema Creating
const UserRegisterSchema = mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true},
    saltString: { type:String },
    userPrivilage:{type:String,default:'User'},
    status: { type:Number, default:1 },
    createdDate: {
        type: String,
        default: `${year}-${month}-${day}-${time}`,
    }
},{timestamps:true}) //find last login updated time


UserRegisterSchema.pre('save', async function (next) { // (pre) means Creating Before AdminRegisterSchema provided by mongoose 1st argument is save inbuilt
    try {
        const Salt = await bcrypt.genSalt(SaltRounds); //bcrypt SaltRounds
        const HashedPassword = await bcrypt.hash(this.password, Salt); //bcrypt.hash take two arguments Password and Salt and then mix up and create 
        this.password = HashedPassword; // now this.Password = HashedPassword
        this.SaltString = Salt;         // and then this.SaltString = Salt
        next();
    } catch (error) {
        return ({
            Message: error.message,
            Data: false,
            Result: null
        }) 
    }
});


//End Block Schema Creating

//Exporting The Schema
module.exports = mongoose.model('UserRegisterCollection',UserRegisterSchema);