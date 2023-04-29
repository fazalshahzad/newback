// const UserManagementModel = require('../models/UserManagementModel')
// const bcrypt = require ('bcrypt')
// const jwt = require ('jsonwebtoken')

// const userRegister = async (req,res)=>{
// try {
//     const {firstName,lastName,email,password} = req.body
// const checIfAdminAlreadyExsist = await UserManagementModel.findOne(
//     {email:email}
// )
// if(checIfAdminAlreadyExsist?.userPrivilage === 'Admin'){
//     return res.json({
//         Message:`Admin Register Is Constraint`,
//         Result:null,
//         data:false
//     })
// }
// let checkAdminIdentity = email.split('@')[0].toLowerCase()
// if(checkAdminIdentity === 'admin'){
//     const adminToCreate = new UserManagementModel ({
//         firstName,lastName,email,password,userPrivilage:'Admin'
//     })
//     const adminToSave = await adminToCreate.save()
//        return res.json({
//         Message:`Register Successfuly`,
//         data:true
//     })
// }
// const userToCreate = new UserManagementModel(
//     firstName,lastName,email,password
// )
// const userToSave = await userToCreate.save()
// res.json({
//     Message:`Register Successfuly`,
//     data:true
// })
// } catch (error) {
//     res.json({
//         Message:error.message,
//         data:false
//     })
// }
// }

// const userLogin = async (req,res)=>{
//     try {
//         const {email, password} = req.body
//         const checkUserExistance = await UserManagementModel.findOne(
//           {email:email}
//         )
//         if(Object.keys(checkUserExistance).length === 0){
//             return res.json({
//                 Message:`Either incorrect password or email`,
//                 data:false
//             })
//         }
//         const checkUserPassword = await bcrypt.compare(password,checkUserExistance.password)
//         if(checkUserPassword === false){
//             return res.json({
//                 Message:`Either incorrect password or email`,
//                 data:false
//             })
//         }
//         const _Token = jwt.sign(                     // jwt.sign take three arguments first payload/body second secreate-key third expire-time
//             {
//                name : 'hi'// payload/body
//             },
//             'superSecreate',                                       // secreate-key 
//             { expiresIn: '10m' }                           //  expire-time
//         )

//         res.json({
//             Message: 'Authentication SuccessFull',
//             Data: true,
//             Result: _Token,
//             UserPrivilage:checkUserExistance.userPrivilage
//         })

//     } catch (error) {
//         res.json({
//             Error: error.message,
//             Data: false,
//             Result: null
//         })
//     }
// }
// module.exports = {
//     userRegister,
//     userLogin 
// }




//Accquiring Models
const userManagementModel = require('../models/UserManagementModel');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')

//Accquiring Models

const userRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const checkIfAdminAlreadyExists = await userManagementModel.findOne({
            email: email
        })

        if (checkIfAdminAlreadyExists?.userPrivilage === 'Admin') {
            return res.json({
                Message: 'Something went wrong Please ask Admin!',
                Status: null,
                Data: false
            })
        }

        let checkAdminIdentity = email.split('@')[0];
        checkAdminIdentity = checkAdminIdentity.toLowerCase();
        if (checkAdminIdentity === 'admin') {
            const adminToCreate = new userManagementModel({
                firstName, lastName, email, password, userPrivilage: 'Admin'
            });
            const adminToSave = await adminToCreate.save();
            return res.json({
                Message: 'Register Successfully',
                Data: true
            })
        }

        const userToCreate = new userManagementModel({
            firstName, lastName, email, password
        })
        const userToSave = await userToCreate.save();
        res.json({
            Message: 'Register Successfully',
            Data: true
        })
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

const userLogin = async (req, res) =>{
    try {
        const { email, password } = req.body;
        const  checkUserExistence = await userManagementModel.findOne(
            {email:email},
            ).lean();
            checkUserExistence;
        if(Object.keys(checkUserExistence).length === 0){
            return res.json({
                Message:'Authentication Failed Either Incorrect Password or Email',
                Data: false,
            })
        }

        const checkUserPassword = await bcrypt.compare(password,checkUserExistence.password);
        if(checkUserPassword === false){
            return res.json({
                Message:'Authentication Failed Either Incorrect Password or Email',
                Data: false,
            })
        }

        const token = jsonwebtoken.sign(
            {
                name: 'hi'
            },
            'superSecret',
            { expiresIn: '15m' }
        )
        
        // delete checkUserExistence['passwrod'];
        res.json({
            Message:'Authenticate Successfuly',
            Data:true,
            Token:token,
            userPrivilage:checkUserExistence.userPrivilage
        })
    } catch (error) {
        console.log(error)
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}
module.exports = {
    userRegister,
    userLogin
}