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
const AdminRegisterSchema = mongoose.Schema({
    FirstName: { type: String, required: true},
    LastName: { type: String, required: true},
    Email: { type: String, required: true, unique:true},
    Password: { type: String, required: true},
    SaltString: { type:String },
    Status: { type:Number, default:1 },
    CreatedDate: {
        type: String,
        default: `${year}-${month}-${day}-${time}`,
    }
},{timestamps:true}) //find last login updated time


AdminRegisterSchema.pre('save', async function (next) { // (pre) means Creating Before AdminRegisterSchema provided by mongoose 1st argument is save inbuilt
    try {
        const Salt = await bcrypt.genSalt(SaltRounds); //bcrypt SaltRounds
        const HashedPassword = await bcrypt.hash(this.Password, Salt); //bcrypt.hash take two arguments Password and Salt and then mix up and create 
        this.Password = HashedPassword; // now this.Password = HashedPassword
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
module.exports = mongoose.model('AdminRegisterCollection',AdminRegisterSchema);