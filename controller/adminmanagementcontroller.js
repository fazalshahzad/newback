const _AdminManagementModel = require('../models/AdminManagementmodel');  //import from admin-model

const jwt = require('jsonwebtoken');  
const bcrypt = require('bcrypt');
const MyKey = process.env.SECRET_KEY;

const AdminRegister= async(req,res) => {                                                        //create AdminRegister 
    try {
        const {FirstName, LastName, Email, Password} = req.body;                               // destruct (FirstName, LastName, Email, Password) from req.body
        const _GetAdminUserLength = await _AdminManagementModel.find();                              // find _AdminManagementModel 
        if (_GetAdminUserLength.length >= 2) {
            res.json({
                Message:`Admin Regesteration is Constraint`,
                Status:null,
                Data:false
            })
        } else {
            const _RegisterAdmin = new _AdminManagementModel({
                FirstName,
                LastName ,
                Email,
                Password
                            
            });
            await _RegisterAdmin.save();
            res.json({
                Message:`User Register Successfully`,
                Data:true,
                Result:_RegisterAdmin
            })
        }
    } catch (error) {
        res.json({ Message: error.message, Result: false });
    }
}

const AdminLogin = async (req,res) =>{
    try {
        _Email = req.body.Email;
        _Password = req.body.Password;
        let _AdminToAuthenticate = await _AdminManagementModel.findOne({ Email: _Email }); //_Email ==> req.body
        if (_AdminToAuthenticate === null) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Result: null,
                Data:false
            })
        }

        const _Result = await bcrypt.compare(_Password, _AdminToAuthenticate.Password);  // req.body.password (front-end Form) and AdminToAuthenticate.Password <==_AdminManagementModel.password
        if (!_Result) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Data: false,
                Result: null
            })
        }                                             // when Password and email matched then go to next step 
        const _Token = jwt.sign(                     // jwt.sign take three arguments first payload/body second secreate-key third expire-time
            {
                Email: _AdminToAuthenticate.Email,   
                SaltString: _AdminToAuthenticate.SaltString // payload/body
            },
            MyKey,                                       // secreate-key 
            { expiresIn: '1h' }                           //  expire-time
        )

        return res.json({
            Message: 'Authentication SuccessFull',
            Data: true,
            Token: _Token,
            Result: _AdminToAuthenticate
        })
   
        

    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

module.exports={AdminRegister,AdminLogin}

// userlogin and regester is (authentication) 
// kis user ko kiaa access milni chahiyaa (authorization)
// this is called roll system