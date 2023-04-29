//Dependencies
const multer = require('multer'); // import multer bescuse i ca handle multipart data

// Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files. in frontend multipart data handling in formData
// and backend multipart data handle multer

const crypto = require('crypto'); 
// crypto is used to genreate password
const fs = require('fs'); //Create File or Folder or Read File Delete File Local machine
// Dependince

//Block Start For Hashing the ImageUrl
const hashFunc = (fileName) => {
    const hash = crypto.createHash('md5');              // (md5) hash (shaa)hash in built
    hash.update(fileName);                              // hashFunc Is used to genreate/convert simple name eg (abc)  to (x53$%gt8985rr34sT!$%)
    const md5sum = hash.digest('hex');
    return md5sum;
  };
//Block Ends For Hashing the ImageUrl


//Block Start MiddleWare For handling The Single Image WIth HashFunction.
let UploadProductImage = multer({
    storage: multer.diskStorage({           //ibuilt functions
        destination: (req, next, cb) => {
            // let path = `./assets/ProductImages`;
            let path = `./assets/ProductImages/${req.body.productName}`; // for error checking
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, function (err,res) {
                    if (err) {
                        res.json(err);
                     }
                     else{
                         res.json('Saved Succefully');
                     }
                });
            }
            cb(null, path);
        },
        filename: (req, file, cb) => {  // cb stand for callback
            const md5sum = hashFunc(file.originalname);   //file.originalname in req.file
      //originalname is the uploaded file's name with date iso String
      let ext = file.mimetype.split('/')[1];   //asfsfsd.jpg ko split karo r index walaa show karo
      // Fix svg+xml bug
      if (ext.includes('svg')) {
        ext = 'svg';
      }

      cb(null, `${Date.now()}_${md5sum}.${ext}`);
        }
    })
});
//Block Ends MiddleWare For handling The Single Image WIth HashFunction.

module.exports = {UploadProductImage};